export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ai_generated_images: {
        Row: {
          id: string
          alt_text: string
          image_url: string
          article_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          alt_text: string
          image_url: string
          article_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          alt_text?: string
          image_url?: string
          article_id?: string | null
          created_at?: string | null
        }
      }
      article_categories: {
        Row: {
          article_id: string | null
          category: string
          created_at: string | null
          id: string
        }
        Insert: {
          article_id?: string | null
          category: string
          created_at?: string | null
          id?: string
        }
        Update: {
          article_id?: string | null
          category?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_categories_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_faqs: {
        Row: {
          answer: string
          article_id: string | null
          created_at: string | null
          id: string
          question: string
        }
        Insert: {
          answer: string
          article_id?: string | null
          created_at?: string | null
          id?: string
          question: string
        }
        Update: {
          answer?: string
          article_id?: string | null
          created_at?: string | null
          id?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_faqs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_locations: {
        Row: {
          article_id: string | null
          created_at: string | null
          id: string
          location: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string | null
          id?: string
          location: string
        }
        Update: {
          article_id?: string | null
          created_at?: string | null
          id?: string
          location?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_locations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          meta_description: string
          meta_title: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          meta_description: string
          meta_title: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          meta_description?: string
          meta_title?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cached_pages: {
        Row: {
          category: string
          content: Json
          id: string
          last_updated: string | null
          location: string
        }
        Insert: {
          category: string
          content: Json
          id?: string
          last_updated?: string | null
          location: string
        }
        Update: {
          category?: string
          content?: Json
          id?: string
          last_updated?: string | null
          location?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          main_category: string
          sub_category: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          main_category: string
          sub_category: string
        }
        Update: {
          created_at?: string | null
          id?: string
          main_category?: string
          sub_category?: string
        }
        Relationships: []
      }
      location_category_descriptions: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          location: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          location: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          location?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string | null
          id: string
          main_location: string
          sub_location: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          main_location: string
          sub_location: string
        }
        Update: {
          created_at?: string | null
          id?: string
          main_location?: string
          sub_location?: string
        }
        Relationships: []
      }
      seo_metadata: {
        Row: {
          category: string
          created_at: string | null
          id: string
          keywords: string[]
          location: string
          meta_description: string
          meta_title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          keywords?: string[]
          location: string
          meta_description: string
          meta_title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          keywords?: string[]
          location?: string
          meta_description?: string
          meta_title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
