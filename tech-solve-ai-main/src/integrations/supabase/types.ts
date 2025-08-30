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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      guides: {
        Row: {
          author_name: string | null
          category_id: string | null
          content: Json
          created_at: string | null
          description: string
          difficulty: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          read_time: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          verified: boolean | null
          youtube_url: string | null
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          content: Json
          created_at?: string | null
          description: string
          difficulty?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          read_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          verified?: boolean | null
          youtube_url?: string | null
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          content?: Json
          created_at?: string | null
          description?: string
          difficulty?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          read_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          verified?: boolean | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guides_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          active: boolean | null
          bg_gradient: string | null
          button_link: string | null
          button_text: string | null
          created_at: string | null
          description: string
          icon: string | null
          id: string
          image_url: string
          order_index: number | null
          subtitle: string | null
          title: string
        }
        Insert: {
          active?: boolean | null
          bg_gradient?: string | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string | null
          description: string
          icon?: string | null
          id?: string
          image_url: string
          order_index?: number | null
          subtitle?: string | null
          title: string
        }
        Update: {
          active?: boolean | null
          bg_gradient?: string | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      problems: {
        Row: {
          category_id: string | null
          common_causes: string[] | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          problem_type: string
          severity: string | null
          symptoms: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          common_causes?: string[] | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          problem_type: string
          severity?: string | null
          symptoms?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          common_causes?: string[] | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          problem_type?: string
          severity?: string | null
          symptoms?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "problems_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      solutions: {
        Row: {
          created_at: string | null
          description: string
          difficulty: string | null
          estimated_time: string | null
          id: string
          problem_id: string | null
          steps: Json
          success_rate: number | null
          title: string
          updated_at: string | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          difficulty?: string | null
          estimated_time?: string | null
          id?: string
          problem_id?: string | null
          steps: Json
          success_rate?: number | null
          title: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          difficulty?: string | null
          estimated_time?: string | null
          id?: string
          problem_id?: string | null
          steps?: Json
          success_rate?: number | null
          title?: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      video_tutorials: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          problem_id: string | null
          rating: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          views: number | null
          youtube_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          problem_id?: string | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          views?: number | null
          youtube_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          problem_id?: string | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          views?: number | null
          youtube_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_tutorials_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_tutorials_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
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
    Enums: {},
  },
} as const
