export interface Material {
    Id: number
    Title: string
    VariantTitle?: string
    BrandName: string
    CoverPhoto: string
    SalesPrice: number
    SalesPriceInUsd: number
  }
  
  export interface Tag {
    Id: number
    Title: string
  }
  
  export interface DeliveryArea {
    Id: number
    Name: string
  }
  
  export interface MaterialsResponse {
    TotalCount: number
    RemainingCount: number
    Tags: Tag[]
    DeliveryAreas: DeliveryArea[]
    Materials: Material[]
  }
  