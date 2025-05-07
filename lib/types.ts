export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface User {
  Username: string;
  FullName: string;
  Email: string;
  Avatar: string;
  Role: {
    Id: number;
    Title: string;
  };
  GiftingCountry: {
    Id: string;
    Name: string;
  };
  Currency: {
    Id: string;
    Symbol: string;
  };
}

export interface AuthResponse {
  Success: boolean;
  Token: string;
  RefreshToken: string;
  AccessTokenExpiresAt: string;
  RefreshTokenExpiresAt: string;
  User: User;
}

export interface Material {
  Id: number;
  Title: string;
  BrandName: string;
  CoverPhoto: string;
  SalesPrice: number;
  SalesPriceInUsd: number;
  VariantTitle?: string;
}

export interface Tag {
  Id: number;
  Title: string;
}

export interface DeliveryArea {
  Id: number;
  Name: string;
}

export interface MaterialsResponse {
  TotalCount: number;
  RemainingCount: number;
  Tags: Tag[];
  DeliveryAreas: DeliveryArea[];
  Materials: Material[];
}