import { SearchTermService } from './services/searchTerm.service';

/**
 * Represents a custom error with a status code.
 */
export class Container {
  private services: Map<string, unknown>;

  /**
   * Initializes a new container instance and registers services.
   */
  constructor() {
    this.services = new Map();
    this.registerServices();
  }

  /**
   * Registers the services in the container.
   */
  private registerServices() {
    this.services.set('SearchTermService', new SearchTermService());
  }

  /**
   * Retrieves a service by name.
   * @param serviceName - The name of the service to retrieve.
   * @returns The requested service as the expected type.
   * @throws Will throw an error if the service is not found.
   */
  public get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);

    if (!service) {
      throw new Error(`Service '${serviceName}' not found.`);
    }

    return service as T;
  }
}

export const container = new Container();
