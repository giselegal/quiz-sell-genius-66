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
          updated_at?: string
        Update: {
          name?: string
          url?: string
        Relationships: []
      }
      participant_answers: {
          option_id: string
          participant_id: string
          points: number
          question_id: string
          option_id?: string
          participant_id?: string
          points?: number
          question_id?: string
        Relationships: [
          {
            foreignKeyName: "participant_answers_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "question_options"
            referencedColumns: ["id"]
          },
            foreignKeyName: "participant_answers_participant_id_fkey"
            columns: ["participant_id"]
            referencedRelation: "quiz_participants"
            foreignKeyName: "participant_answers_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "quiz_questions"
        ]
      profiles: {
          first_name: string | null
          is_admin: boolean | null
          last_name: string | null
          first_name?: string | null
          is_admin?: boolean | null
          last_name?: string | null
      question_options: {
          image_url: string | null
          order_index: number
          style_code: string
          style_type_id: string
          text: string
          image_url?: string | null
          order_index?: number
          style_code?: string
          style_type_id?: string
          text?: string
            foreignKeyName: "question_options_question_id_fkey"
            foreignKeyName: "question_options_style_type_id_fkey"
            columns: ["style_type_id"]
            referencedRelation: "style_types"
      quiz_analytics: {
          action_type: string
          question_id: string | null
          question_id?: string | null
          action_type?: string
            foreignKeyName: "quiz_analytics_participant_id_fkey"
      quiz_participants: {
          additional_info: Json | null
          completed: boolean | null
          completed_at: string | null
          current_question_id: string | null
          email: string | null
          ip_address: string | null
          last_activity_at: string | null
          progress_percentage: number | null
          quiz_id: string
          referrer: string | null
          started_at: string
          user_agent: string | null
          additional_info?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          current_question_id?: string | null
          email?: string | null
          ip_address?: string | null
          last_activity_at?: string | null
          progress_percentage?: number | null
          referrer?: string | null
          started_at?: string
          user_agent?: string | null
          quiz_id?: string
            foreignKeyName: "quiz_participants_quiz_id_fkey"
            columns: ["quiz_id"]
            referencedRelation: "quizzes"
      quiz_questions: {
          columns_count: number | null
          image_size: string | null
          required_selections: number | null
          subtitle: string | null
          title: string
          type: string
          columns_count?: number | null
          image_size?: string | null
          required_selections?: number | null
          subtitle?: string | null
          title?: string
          type?: string
            foreignKeyName: "quiz_questions_quiz_id_fkey"
      quiz_settings: {
          settings: Json
          settings?: Json
            foreignKeyName: "quiz_settings_quiz_id_fkey"
      quizzes: {
          description: string | null
          description?: string | null
      style_results: {
          is_primary: boolean | null
          percentage: number
          rank: number
          is_primary?: boolean | null
          percentage?: number
          rank?: number
            foreignKeyName: "style_results_participant_id_fkey"
            foreignKeyName: "style_results_style_type_id_fkey"
      style_types: {
          code: string
          description: string
          code?: string
          description?: string
      utm_analytics: {
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
    }
    Views: {
      [_ in never]: never
    Functions: {
    Enums: {
    CompositeTypes: {
  }
}
type DefaultSchema = Database[Extract<keyof Database, "public">]
export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      ? R
      : never
export type TablesInsert<
    | keyof DefaultSchema["Tables"]
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    ? I
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      ? I
export type TablesUpdate<
      Update: infer U
    ? U
        Update: infer U
      ? U
export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
export const Constants = {
    Enums: {},
  },
} as const
