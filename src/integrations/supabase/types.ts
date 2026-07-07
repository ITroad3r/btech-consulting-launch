export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          body_html_en: string | null
          body_html_fr: string | null
          canonical_url: string | null
          cover_image_url: string | null
          created_at: string
          excerpt_en: string | null
          excerpt_fr: string | null
          id: string
          json_ld: Json | null
          keywords: string | null
          meta_description_en: string | null
          meta_description_fr: string | null
          meta_title_en: string | null
          meta_title_fr: string | null
          noindex: boolean
          og_image_url: string | null
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title_en: string
          title_fr: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          body_html_en?: string | null
          body_html_fr?: string | null
          canonical_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_fr?: string | null
          id?: string
          json_ld?: Json | null
          keywords?: string | null
          meta_description_en?: string | null
          meta_description_fr?: string | null
          meta_title_en?: string | null
          meta_title_fr?: string | null
          noindex?: boolean
          og_image_url?: string | null
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title_en?: string
          title_fr?: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          body_html_en?: string | null
          body_html_fr?: string | null
          canonical_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_fr?: string | null
          id?: string
          json_ld?: Json | null
          keywords?: string | null
          meta_description_en?: string | null
          meta_description_fr?: string | null
          meta_title_en?: string | null
          meta_title_fr?: string | null
          noindex?: boolean
          og_image_url?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title_en?: string
          title_fr?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          company_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          internal_notes: string | null
          lead_type: string
          need_description: string | null
          page_url: string | null
          phone: string | null
          preferred_contact_method: string | null
          preferred_date_time: string | null
          selected_service: string | null
          service_pillar: string | null
          source: string
          status: string
          updated_at: string
          urgency: string | null
          user_agent: string | null
        }
        Insert: {
          assigned_to?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          internal_notes?: string | null
          lead_type: string
          need_description?: string | null
          page_url?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_date_time?: string | null
          selected_service?: string | null
          service_pillar?: string | null
          source?: string
          status?: string
          updated_at?: string
          urgency?: string | null
          user_agent?: string | null
        }
        Update: {
          assigned_to?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          internal_notes?: string | null
          lead_type?: string
          need_description?: string | null
          page_url?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_date_time?: string | null
          selected_service?: string | null
          service_pillar?: string | null
          source?: string
          status?: string
          updated_at?: string
          urgency?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          description: string | null
          id: string
          key: string
          type: string
          updated_at: string
          updated_by: string | null
          value_en: string | null
          value_fr: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          type?: string
          updated_at?: string
          updated_by?: string | null
          value_en?: string | null
          value_fr?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          type?: string
          updated_at?: string
          updated_by?: string | null
          value_en?: string | null
          value_fr?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_address: string | null
          contact_email: string | null
          contact_phone: string | null
          default_meta_description: string | null
          default_meta_title: string | null
          default_og_image: string | null
          id: number
          site_name: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_tiktok: string | null
          social_x: string | null
          social_youtube: string | null
          updated_at: string
        }
        Insert: {
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          default_meta_description?: string | null
          default_meta_title?: string | null
          default_og_image?: string | null
          id?: number
          site_name?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_tiktok?: string | null
          social_x?: string | null
          social_youtube?: string | null
          updated_at?: string
        }
        Update: {
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          default_meta_description?: string | null
          default_meta_title?: string | null
          default_og_image?: string | null
          id?: number
          site_name?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_tiktok?: string | null
          social_x?: string | null
          social_youtube?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
