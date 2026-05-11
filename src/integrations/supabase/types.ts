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
      app_settings: {
        Row: {
          id: boolean
          updated_at: string
          yclients_url: string
        }
        Insert: {
          id?: boolean
          updated_at?: string
          yclients_url?: string
        }
        Update: {
          id?: boolean
          updated_at?: string
          yclients_url?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          class_id: string | null
          created_at: string
          customer_name: string
          customer_phone: string
          id: string
          note: string
          source: Database["public"]["Enums"]["booking_source"]
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          customer_name: string
          customer_phone?: string
          id?: string
          note?: string
          source?: Database["public"]["Enums"]["booking_source"]
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Update: {
          class_id?: string | null
          created_at?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          note?: string
          source?: Database["public"]["Enums"]["booking_source"]
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "schedule_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      directions: {
        Row: {
          created_at: string
          description: string
          icon_url: string
          id: string
          image_url: string
          is_published: boolean
          kicker: string
          sort_order: number
          title: string
          updated_at: string
          yclients_url: string
        }
        Insert: {
          created_at?: string
          description?: string
          icon_url?: string
          id?: string
          image_url?: string
          is_published?: boolean
          kicker?: string
          sort_order?: number
          title: string
          updated_at?: string
          yclients_url?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon_url?: string
          id?: string
          image_url?: string
          is_published?: boolean
          kicker?: string
          sort_order?: number
          title?: string
          updated_at?: string
          yclients_url?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          bio: string
          created_at: string
          id: string
          is_published: boolean
          name: string
          photos: string[]
          role: string
          short_desc: string
          sort_order: number
          updated_at: string
          yclients_url: string
          years: string
        }
        Insert: {
          bio?: string
          created_at?: string
          id?: string
          is_published?: boolean
          name: string
          photos?: string[]
          role?: string
          short_desc?: string
          sort_order?: number
          updated_at?: string
          yclients_url?: string
          years?: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          is_published?: boolean
          name?: string
          photos?: string[]
          role?: string
          short_desc?: string
          sort_order?: number
          updated_at?: string
          yclients_url?: string
          years?: string
        }
        Relationships: []
      }
      schedule_classes: {
        Row: {
          booking_url: string
          class_type: string
          created_at: string
          description: string
          duration_min: number
          id: string
          instructor_id: string | null
          is_published: boolean
          seats_total: number
          starts_at: string
          title: string
          updated_at: string
        }
        Insert: {
          booking_url?: string
          class_type?: string
          created_at?: string
          description?: string
          duration_min?: number
          id?: string
          instructor_id?: string | null
          is_published?: boolean
          seats_total?: number
          starts_at: string
          title: string
          updated_at?: string
        }
        Update: {
          booking_url?: string
          class_type?: string
          created_at?: string
          description?: string
          duration_min?: number
          id?: string
          instructor_id?: string | null
          is_published?: boolean
          seats_total?: number
          starts_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_classes_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
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
      booking_source:
        | "site"
        | "manual"
        | "phone"
        | "instagram"
        | "whatsapp"
        | "telegram"
        | "other"
      booking_status: "pending" | "confirmed" | "cancelled"
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
      booking_source: [
        "site",
        "manual",
        "phone",
        "instagram",
        "whatsapp",
        "telegram",
        "other",
      ],
      booking_status: ["pending", "confirmed", "cancelled"],
    },
  },
} as const
