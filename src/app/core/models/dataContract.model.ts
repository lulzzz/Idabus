export enum AuthMode {
  basic = 'basic',
  windows = 'windows',
  azure = 'azure'
}

export class AuthUser {
  DisplayName?: string;
  ObjectID?: string;
  AccountName?: string;
  AccessToken?: string;
  AccessConnection?: string;
}

export class ConnectedUser {
  public baseAddress: string;
  public name: string;
  public domain: string;
  public password: string;
}

export class BasicResource {
  public DisplayName: string;
  public ObjectID: string;
  public ObjectType: string;
}

export interface AnyProperties {
  [prop: string]: BasicResource | any;
}

export type Resource = AnyProperties & {};

export class ResourceSet {
  public hasMoreItems: boolean;
  public totalCount: number;
  public results: Resource[];
}
