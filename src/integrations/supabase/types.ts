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
      image_bank: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      participant_answers: {
        Row: {
          created_at: string
          id: string
          option_id: string
          participant_id: string
          points: number
          question_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_id: string
          participant_id: string
          points: number
          question_id: string
        }
        Update: {
          created_at?: string
          id?: string
          option_id?: string
          participant_id?: string
          points?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_answers_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "question_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_answers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "quiz_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
        }
        Relationships: []
      }
      question_options: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          image_url: string | null
          order_index: number
          points: number
          question_id: string
          style_code: string
          style_type_id: string
          text: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          image_url?: string | null
          order_index: number
          points?: number
          question_id: string
          style_code: string
          style_type_id: string
          text: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          image_url?: string | null
          order_index?: number
          points?: number
          question_id?: string
          style_code?: string
          style_type_id?: string
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_options_style_type_id_fkey"
            columns: ["style_type_id"]
            isOneToOne: false
            referencedRelation: "style_types"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_analytics: {
        Row: {
          action_type: string
          created_at: string
          id: string
          participant_id: string
          question_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          participant_id: string
          question_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          participant_id?: string
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_analytics_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "quiz_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_participants: {
        Row: {
          additional_info: Json | null
          completed: boolean | null
          completed_at: string | null
          created_at: string
          current_question_id: string | null
          email: string | null
          id: string
          ip_address: string | null
          last_activity_at: string | null
          name: string
          progress_percentage: number | null
          quiz_id: string
          referrer: string | null
          started_at: string
          user_agent: string | null
        }
        Insert: {
          additional_info?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_question_id?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          last_activity_at?: string | null
          name: string
          progress_percentage?: number | null
          quiz_id: string
          referrer?: string | null
          started_at?: string
          user_agent?: string | null
        }
        Update: {
          additional_info?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_question_id?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          last_activity_at?: string | null
          name?: string
          progress_percentage?: number | null
          quiz_id?: string
          referrer?: string | null
          started_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_participants_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          active: boolean | null
          columns_count: number | null
          created_at: string
          id: string
          image_size: string | null
          order_index: number
          quiz_id: string
          required_selections: number | null
          subtitle: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          columns_count?: number | null
          created_at?: string
          id?: string
          image_size?: string | null
          order_index: number
          quiz_id: string
          required_selections?: number | null
          subtitle?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          columns_count?: number | null
          created_at?: string
          id?: string
          image_size?: string | null
          order_index?: number
          quiz_id?: string
          required_selections?: number | null
          subtitle?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_settings: {
        Row: {
          created_at: string
          id: string
          quiz_id: string
          settings: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          quiz_id: string
          settings?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          quiz_id?: string
          settings?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_settings_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          active: boolean | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      style_results: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean | null
          participant_id: string
          percentage: number
          points: number
          rank: number
          style_type_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          participant_id: string
          percentage: number
          points: number
          rank: number
          style_type_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          participant_id?: string
          percentage?: number
          points?: number
          rank?: number
          style_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "style_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "quiz_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "style_results_style_type_id_fkey"
            columns: ["style_type_id"]
            isOneToOne: false
            referencedRelation: "style_types"
            referencedColumns: ["id"]
          },
        ]
      }
      style_types: {
        Row: {
          code: string
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      utm_analytics: {
        Row: {
          created_at: string
          id: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
