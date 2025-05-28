
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion, StyleResult } from '@/types/quiz';
export const fetchQuizQuestions = async (quizId: string) => {
  const { data: questions, error } = await supabase
    .from('quiz_questions')
    .select(`
      *,
      question_options:question_options(*)
    `)
    .eq('quiz_id', quizId)
    .eq('active', true)
    .order('order_index', { ascending: true });
  if (error) throw error;
  return questions;
};
export const saveParticipant = async (name: string, email: string, quizId: string) => {
  const { data, error } = await supabase
    .from('quiz_participants')
    .insert({
      name,
      email,
      quiz_id: quizId,
    })
    .select()
    .single();
  return data;
export const saveAnswers = async (
  participantId: string,
  answers: Array<{ questionId: string; optionId: string; points: number }>
) => {
  const { error } = await supabase
    .from('participant_answers')
    .insert(
      answers.map(answer => ({
        participant_id: participantId,
        question_id: answer.questionId,
        option_id: answer.optionId,
        points: answer.points,
      }))
    );
export const saveResults = async (
  results: Array<StyleResult>
    .from('style_results')
      results.map((result, index) => ({
        style_type_id: result.category,
        points: result.score,
        percentage: result.percentage,
        is_primary: index === 0,
        rank: index + 1,
