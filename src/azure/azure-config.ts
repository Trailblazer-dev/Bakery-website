/**
 * Azure Configuration
 * 
 * This file contains configuration settings for Azure services used in the application.
 * Following Azure best practices for secure and scalable web applications.
 */

// Base configuration
export const azureConfig = {
  // Azure App Service configuration for hosting
  appService: {
    region: process.env.AZURE_REGION || "eastus",
    // Using Basic tier instead of Free for better performance in production
    sku: process.env.AZURE_APP_SERVICE_SKU || "B1", 
    nodeVersion: process.env.AZURE_NODE_VERSION || "18-lts",
    // Keep the app warm for faster response times
    alwaysOn: process.env.NODE_ENV === 'production'
  },
  
  // Azure Static Web Apps - alternative to App Service for static sites with serverless APIs
  staticWebApps: {
    enabled: process.env.AZURE_STATIC_WEBAPPS_ENABLED === 'true',
    // Standard tier provides more build minutes and custom domains
    sku: process.env.AZURE_STATIC_WEBAPPS_SKU || 'Standard'
  },
  
  // Azure Storage for static assets
  storage: {
    accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME || "",
    containerName: process.env.AZURE_STORAGE_CONTAINER_NAME || "assets",
    // Enable HTTPS by default for security
    enableHttps: true,
    // Configure CORS for web access
    allowedOrigins: process.env.AZURE_STORAGE_ALLOWED_ORIGINS?.split(',') || ['*'],
    // Use GRS (Geo-redundant storage) for production data
    replication: process.env.NODE_ENV === 'production' ? 'GRS' : 'LRS'
  },
  
  // Azure Cosmos DB for data storage
  cosmosDb: {
    endpoint: process.env.AZURE_COSMOS_ENDPOINT || "",
    key: process.env.AZURE_COSMOS_KEY || "",
    databaseId: process.env.AZURE_COSMOS_DATABASE_ID || "bakery-db",
    // Default throughput setting (400 RU/s is the minimum)
    throughput: parseInt(process.env.AZURE_COSMOS_THROUGHPUT || "400", 10),
    // Enable autoscale in production for better performance under varying loads
    autoscale: process.env.NODE_ENV === 'production',
    // Recommended consistency level for web apps
    consistencyLevel: "Session"
  },
  
  // Azure Application Insights for monitoring
  appInsights: {
    instrumentationKey: process.env.AZURE_APP_INSIGHTS_KEY || "",
    // Connection string is preferred over instrumentation key in newer SDKs
    connectionString: process.env.AZURE_APP_INSIGHTS_CONNECTION_STRING || "",
    // Enable distributed tracing for better diagnostics
    enableDistributedTracing: true,
    // Sample rate to control telemetry volume (1.0 = 100%)
    samplingPercentage: parseFloat(process.env.AZURE_APP_INSIGHTS_SAMPLING || "1.0")
  },
  
  // Azure CDN for content delivery
  cdn: {
    enabled: process.env.AZURE_CDN_ENABLED === 'true',
    profileName: process.env.AZURE_CDN_PROFILE_NAME || "",
    endpointName: process.env.AZURE_CDN_ENDPOINT_NAME || "",
    // Microsoft's Premium Verizon CDN provides advanced features like custom rules
    cdnSku: process.env.AZURE_CDN_SKU || "Standard_Microsoft"
  },
  
  // Azure Key Vault for secrets management
  keyVault: {
    enabled: process.env.AZURE_KEY_VAULT_ENABLED === 'true',
    name: process.env.AZURE_KEY_VAULT_NAME || "",
    // Use managed identity for secure access without credentials
    useManagedIdentity: true
  },
  
  // Azure Front Door for global load balancing and WAF protection
  frontDoor: {
    enabled: process.env.AZURE_FRONT_DOOR_ENABLED === 'true',
    name: process.env.AZURE_FRONT_DOOR_NAME || "",
    // Enable WAF for security
    enableWaf: process.env.NODE_ENV === 'production'
  }
};

// Validate configuration - useful to catch misconfigurations early
export function validateAzureConfig() {
  const missingEnvVars = [];
  
  if (process.env.NODE_ENV === 'production') {
    // Required settings for production
    if (!process.env.AZURE_STORAGE_ACCOUNT_NAME) {
      missingEnvVars.push('AZURE_STORAGE_ACCOUNT_NAME');
    }
    
    // Either instrumentation key or connection string is required for App Insights
    if (!process.env.AZURE_APP_INSIGHTS_KEY && !process.env.AZURE_APP_INSIGHTS_CONNECTION_STRING) {
      missingEnvVars.push('AZURE_APP_INSIGHTS_KEY or AZURE_APP_INSIGHTS_CONNECTION_STRING');
    }
    
    // Check CDN configuration if enabled
    if (azureConfig.cdn.enabled) {
      if (!process.env.AZURE_CDN_PROFILE_NAME) {
        missingEnvVars.push('AZURE_CDN_PROFILE_NAME');
      }
      if (!process.env.AZURE_CDN_ENDPOINT_NAME) {
        missingEnvVars.push('AZURE_CDN_ENDPOINT_NAME');
      }
    }
    
    // Check Key Vault configuration if enabled
    if (azureConfig.keyVault.enabled && !process.env.AZURE_KEY_VAULT_NAME) {
      missingEnvVars.push('AZURE_KEY_VAULT_NAME');
    }
    
    // Check Front Door configuration if enabled
    if (azureConfig.frontDoor.enabled && !process.env.AZURE_FRONT_DOOR_NAME) {
      missingEnvVars.push('AZURE_FRONT_DOOR_NAME');
    }
    
    if (missingEnvVars.length > 0) {
      console.warn(`Warning: Missing Azure configuration: ${missingEnvVars.join(', ')}`);
      return false;
    }
  }
  
  return true;
}

// Helper functions for Azure resources

/**
 * Initialize Application Insights
 * @returns boolean indicating if initialization was successful
 */
export function initializeAppInsights() {
  if (typeof window !== 'undefined' && 
      (azureConfig.appInsights.instrumentationKey || azureConfig.appInsights.connectionString)) {
    // This would be implemented with the Application Insights SDK
    return true;
  }
  return false;
}

/**
 * Generate a URL for an asset, using CDN if configured
 * @param assetPath Path to the asset relative to container root
 * @returns Full URL to access the asset
 */
export function getAssetUrl(assetPath: string): string {
  if (!assetPath) return '';
  
  // Strip leading slash if present
  const normalizedPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // Use CDN in production if enabled
  if (azureConfig.cdn.enabled && process.env.NODE_ENV === 'production') {
    return `https://${azureConfig.cdn.endpointName}.azureedge.net/${normalizedPath}`;
  }
  
  // Use Front Door if enabled
  if (azureConfig.frontDoor.enabled && process.env.NODE_ENV === 'production') {
    return `https://${azureConfig.frontDoor.name}.azurefd.net/${normalizedPath}`;
  }
  
  // Fallback to direct storage access
  if (azureConfig.storage.accountName) {
    const protocol = azureConfig.storage.enableHttps ? 'https' : 'http';
    return `${protocol}://${azureConfig.storage.accountName}.blob.core.windows.net/${azureConfig.storage.containerName}/${normalizedPath}`;
  }
  
  // Local development fallback
  return `/${normalizedPath}`;
}
