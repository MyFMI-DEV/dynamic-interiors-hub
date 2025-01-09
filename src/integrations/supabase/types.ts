export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      article_categories: {
        Row: {
          article_id: string
          category: string
          created_at: string | null
          id: string
        }
        Insert: {
          article_id: string
          category: string
          created_at?: string | null
          id?: string
        }
        Update: {
          article_id?: string
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
          article_id: string
          created_at: string | null
          id: string
          question: string
        }
        Insert: {
          answer: string
          article_id: string
          created_at?: string | null
          id?: string
          question: string
        }
        Update: {
          answer?: string
          article_id?: string
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
          article_id: string
          created_at: string | null
          id: string
          location: string
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          location: string
        }
        Update: {
          article_id?: string
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
          description: string
          id: string
          image_url: string
          keywords: string[]
          meta_description: string
          meta_title: string
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          keywords?: string[]
          meta_description: string
          meta_title: string
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          keywords?: string[]
          meta_description?: string
          meta_title?: string
          published_at?: string | null
          slug?: string
          title?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
