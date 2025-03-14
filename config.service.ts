import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export class ConfigService {
  private secrets: Record<string, string> = {};

  constructor() {
    this.loadSecrets();
  }

  private async loadSecrets() {
    const client = new SecretsManagerClient({ region: "us-east-1" });
    const command = new GetSecretValueCommand({ SecretId: "mySecretId" });

    try {
      const response = await client.send(command);
      if (response.SecretString) {
        this.secrets = JSON.parse(response.SecretString);
      }
    } catch (error) {
      console.error("Error obteniendo secretos:", error);
    }
  }

  get(key: string): string {
    return this.secrets[key] || process.env[key]!;
  }
}
