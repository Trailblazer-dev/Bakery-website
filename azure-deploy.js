/**
 * Azure Deployment Script
 * 
 * This script automates deployment to Azure using the Azure CLI.
 * 
 * Prerequisites:
 * 1. Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
 * 2. Login to Azure CLI: az login
 * 3. Set appropriate environment variables or edit the values below
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file if present
dotenv.config();

// Configuration (override with environment variables)
const config = {
  // Azure resource group settings
  resourceGroup: process.env.AZURE_RESOURCE_GROUP || 'bakery-website-rg',
  location: process.env.AZURE_LOCATION || 'eastus',
  
  // Azure App Service settings
  appName: process.env.AZURE_APP_NAME || 'bakery-website',
  sku: process.env.AZURE_APP_SERVICE_SKU || 'F1', // Free tier
  
  // Azure Storage settings for static content
  storageAccount: process.env.AZURE_STORAGE_ACCOUNT || `bakerywebassets${Date.now().toString().slice(-8)}`,
  containerName: process.env.AZURE_CONTAINER_NAME || 'assets',
};

// Execute command and return output
function execCommand(command) {
  console.log(`Executing: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    return output.trim();
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    throw error;
  }
}

// Check if Azure CLI is installed and logged in
function checkAzureCliLogin() {
  try {
    const account = execCommand('az account show');
    console.log('Azure CLI is logged in.');
    return JSON.parse(account);
  } catch (error) {
    console.error('Error: Azure CLI not installed or not logged in.');
    console.error('Please install Azure CLI and run "az login".');
    process.exit(1);
  }
}

// Create resource group if it doesn't exist
function createResourceGroupIfNotExists() {
  try {
    const exists = execCommand(`az group exists --name ${config.resourceGroup}`);
    
    if (exists === 'false') {
      console.log(`Creating resource group '${config.resourceGroup}'...`);
      execCommand(`az group create --name ${config.resourceGroup} --location ${config.location}`);
      console.log(`Resource group '${config.resourceGroup}' created.`);
    } else {
      console.log(`Resource group '${config.resourceGroup}' already exists.`);
    }
  } catch (error) {
    console.error(`Error creating resource group: ${error.message}`);
    process.exit(1);
  }
}

// Create storage account for static assets
function createStorageAccount() {
  try {
    console.log(`Creating storage account '${config.storageAccount}'...`);
    
    // Check if storage account exists
    try {
      execCommand(`az storage account show --name ${config.storageAccount} --resource-group ${config.resourceGroup}`);
      console.log(`Storage account '${config.storageAccount}' already exists.`);
    } catch (error) {
      // Create storage account if it doesn't exist
      execCommand(`az storage account create --name ${config.storageAccount} --resource-group ${config.resourceGroup} --location ${config.location} --sku Standard_LRS --kind StorageV2 --https-only true --allow-blob-public-access true`);
      console.log(`Storage account '${config.storageAccount}' created.`);
    }
    
    // Enable static website hosting
    execCommand(`az storage blob service-properties update --account-name ${config.storageAccount} --static-website --index-document index.html --404-document index.html`);
    
    // Get storage account key
    const keys = JSON.parse(execCommand(`az storage account keys list --resource-group ${config.resourceGroup} --account-name ${config.storageAccount}`));
    const accountKey = keys[0].value;
    
    return {
      name: config.storageAccount,
      key: accountKey
    };
  } catch (error) {
    console.error(`Error creating storage account: ${error.message}`);
    process.exit(1);
  }
}

// Create App Service plan and web app
function createAppService() {
  try {
    // Create App Service plan
    console.log(`Creating App Service plan...`);
    execCommand(`az appservice plan create --name ${config.appName}-plan --resource-group ${config.resourceGroup} --sku ${config.sku} --is-linux`);
    
    // Create web app
    console.log(`Creating web app '${config.appName}'...`);
    execCommand(`az webapp create --resource-group ${config.resourceGroup} --plan ${config.appName}-plan --name ${config.appName} --runtime "NODE|18-lts"`);
    
    // Configure web app settings
    console.log(`Configuring web app settings...`);
    execCommand(`az webapp config appsettings set --resource-group ${config.resourceGroup} --name ${config.appName} --settings WEBSITE_NODE_DEFAULT_VERSION=18-lts SCM_DO_BUILD_DURING_DEPLOYMENT=true`);
    
    return {
      name: config.appName,
      defaultHostname: `${config.appName}.azurewebsites.net`
    };
  } catch (error) {
    console.error(`Error creating App Service: ${error.message}`);
    process.exit(1);
  }
}

// Build and deploy the application
function buildAndDeploy() {
  try {
    // Build the application
    console.log('Building the application...');
    execCommand('npm run build');
    
    // Deploy to App Service
    console.log(`Deploying to App Service '${config.appName}'...`);
    execCommand(`az webapp deployment source config-local-git --resource-group ${config.resourceGroup} --name ${config.appName}`);
    
    // Get deployment URL
    const gitUrl = execCommand(`az webapp deployment source config-local-git --resource-group ${config.resourceGroup} --name ${config.appName} --query url --output tsv`);
    
    console.log(`\nDeployment prepared. To push your code, run the following commands:`);
    console.log(`git remote add azure ${gitUrl}`);
    console.log(`git push azure main`);
    
    return true;
  } catch (error) {
    console.error(`Error during build and deploy: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting Azure deployment...');
  
  // Check Azure CLI login
  checkAzureCliLogin();
  
  // Create resource group
  createResourceGroupIfNotExists();
  
  // Create storage account
  const storageAccount = createStorageAccount();
  console.log(`Storage account created: ${storageAccount.name}`);
  
  // Create App Service
  const appService = createAppService();
  console.log(`App Service created: ${appService.defaultHostname}`);
  
  // Build and deploy
  const deploymentSuccessful = buildAndDeploy();
  
  if (deploymentSuccessful) {
    console.log('\nAzure resources created successfully!');
    console.log(`Web app URL: https://${appService.defaultHostname}`);
    
    // Save deployment information for future use
    const deploymentInfo = {
      resourceGroup: config.resourceGroup,
      appService: appService,
      storageAccount: {
        name: storageAccount.name,
        url: `https://${storageAccount.name}.z13.web.core.windows.net`
      },
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log('Deployment information saved to deployment-info.json');
  } else {
    console.log('\nAzure resources created, but deployment preparation failed. See errors above.');
  }
}

// Run the main function
main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
