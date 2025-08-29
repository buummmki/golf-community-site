import { useState, useEffect } from 'react';
import { supabase, Round, RoundParticipant, TABLES } from '../lib/supabase';
import { useAuth } from '@clerk/clerk-react';

export const useRounds = () => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  // ?¼ìš´??ëª©ë¡ ë¶ˆëŸ¬?¤ê¸°
  const fetchRounds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      setRounds(data || []);
    } catch (err) {
      console.error('?¼ìš´??ëª©ë¡ ë¶ˆëŸ¬?¤ê¸° ?¤íŒ¨:', err);
      setError(err instanceof Error ? err.message : '?¼ìš´??ëª©ë¡??ë¶ˆëŸ¬?¤ëŠ”???¤íŒ¨?ˆìŠµ?ˆë‹¤.');
    } finally {
      setLoading(false);
    }
  };

  // ?¼ìš´???ì„±
  const createRound = async (roundData: {
    title: string;
    description: string;
    golf_course: string;
    date: string;
    time: string;
    max_participants: number;
    green_fee?: string;
    region: string;
  }) => {
    if (!userId || !user) {
      return { success: false, error: 'ë¡œê·¸?¸ì´ ?„ìš”?©ë‹ˆ??' };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .insert({
          ...roundData,
          author_id: userId,
          author_name: user.firstName || user.username || '?µëª…',
          current_participants: 1, // ?‘ì„±?ê? ì²?ë²ˆì§¸ ì°¸ì—¬??          status: 'recruiting',
        })
        .select()
        .single();

      if (error) throw error;

      // ?‘ì„±?ë? ì°¸ì—¬?ë¡œ ?ë™ ì¶”ê?
      await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .insert({
          round_id: data.id,
          user_id: userId,
          user_name: user.firstName || user.username || '?µëª…',
        });

      setRounds(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('?¼ìš´???ì„± ?¤íŒ¨:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '?¼ìš´???ì„±???¤íŒ¨?ˆìŠµ?ˆë‹¤.' 
      };
    }
  };

  // ?¼ìš´???˜ì •
  const updateRound = async (roundId: string, updates: Partial<Round>) => {
    if (!userId) {
      return { success: false, error: 'ë¡œê·¸?¸ì´ ?„ìš”?©ë‹ˆ??' };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .update({ 
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', roundId)
        .eq('author_id', userId) // ?‘ì„±?ë§Œ ?˜ì • ê°€??        .select()
        .single();

      if (error) throw error;

      setRounds(prev => prev.map(round => 
        round.id === roundId ? { ...round, ...data } : round
      ));
      return { success: true, data };
    } catch (err) {
      console.error('?¼ìš´???˜ì • ?¤íŒ¨:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '?¼ìš´???˜ì •???¤íŒ¨?ˆìŠµ?ˆë‹¤.' 
      };
    }
  };

  // ?¼ìš´???? œ
  const deleteRound = async (roundId: string) => {
    if (!userId) {
      return { success: false, error: 'ë¡œê·¸?¸ì´ ?„ìš”?©ë‹ˆ??' };
    }

    try {
      const { error } = await supabase
        .from(TABLES.ROUNDS)
        .delete()
        .eq('id', roundId)
        .eq('author_id', userId); // ?‘ì„±?ë§Œ ?? œ ê°€??
      if (error) throw error;

      setRounds(prev => prev.filter(round => round.id !== roundId));
      return { success: true };
    } catch (err) {
      console.error('?¼ìš´???? œ ?¤íŒ¨:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '?¼ìš´???? œ???¤íŒ¨?ˆìŠµ?ˆë‹¤.' 
      };
    }
  };

  // ?¼ìš´??ì°¸ì—¬
  const joinRound = async (roundId: string) => {
    if (!userId || !user) {
      return { success: false, error: 'ë¡œê·¸?¸ì´ ?„ìš”?©ë‹ˆ??' };
    }

    try {
      // ?„ì¬ ?¼ìš´???•ë³´ ?•ì¸
      const { data: roundData, error: roundError } = await supabase
        .from(TABLES.ROUNDS)
        .select('*')
        .eq('id', roundId)
        .single();

      if (roundError) throw roundError;

      if (roundData.current_participants >= roundData.max_participants) {
        return { success: false, error: '?´ë? ?•ì›??ë§ˆê°?˜ì—ˆ?µë‹ˆ??' };
      }

      // ?´ë? ì°¸ì—¬?ˆëŠ”ì§€ ?•ì¸
      const { data: existingParticipant } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .select('*')
        .eq('round_id', roundId)
        .eq('user_id', userId)
        .single();

      if (existingParticipant) {
        return { success: false, error: '?´ë? ì°¸ì—¬ ì¤‘ì¸ ?¼ìš´?©ì…?ˆë‹¤.' };
      }

      // ì°¸ì—¬??ì¶”ê?
      const { error: participantError } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .insert({
          round_id: roundId,
          user_id: userId,
          user_name: user.firstName || user.username || '?µëª…',
        });

      if (participantError) throw participantError;

      // ì°¸ì—¬?????…ë°?´íŠ¸
      const newParticipantCount = roundData.current_participants + 1;
      const { data: updatedRound, error: updateError } = await supabase
        .from(TABLES.ROUNDS)
        .update({
          current_participants: newParticipantCount,
          status: newParticipantCount >= roundData.max_participants ? 'full' : 'recruiting'
        })
        .eq('id', roundId)
        .select()
        .single();

      if (updateError) throw updateError;

      setRounds(prev => prev.map(round => 
        round.id === roundId ? updatedRound : round
      ));

      return { success: true };
    } catch (err) {
      console.error('?¼ìš´??ì°¸ì—¬ ?¤íŒ¨:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '?¼ìš´??ì°¸ì—¬???¤íŒ¨?ˆìŠµ?ˆë‹¤.' 
      };
    }
  };

  // ?¼ìš´???ˆí‡´
  const leaveRound = async (roundId: string) => {
    if (!userId) {
      return { success: false, error: 'ë¡œê·¸?¸ì´ ?„ìš”?©ë‹ˆ??' };
    }

    try {
      // ?¼ìš´???‘ì„±?ì¸ì§€ ?•ì¸
      const { data: roundData } = await supabase
        .from(TABLES.ROUNDS)
        .select('author_id, current_participants')
        .eq('id', roundId)
        .single();

      if (roundData?.author_id === userId) {
        return { success: false, error: '?¼ìš´???‘ì„±?ëŠ” ?ˆí‡´?????†ìŠµ?ˆë‹¤.' };
      }

      // ì°¸ì—¬???? œ
      const { error: deleteError } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .delete()
        .eq('round_id', roundId)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // ì°¸ì—¬?????…ë°?´íŠ¸
      if (roundData) {
        const newParticipantCount = roundData.current_participants - 1;
        const { data: updatedRound, error: updateError } = await supabase
          .from(TABLES.ROUNDS)
          .update({
            current_participants: newParticipantCount,
            status: 'recruiting' // ??ëª…ì´?¼ë„ ë¹ ì?ë©??¤ì‹œ ëª¨ì§‘ì¤?          })
          .eq('id', roundId)
          .select()
          .single();

        if (updateError) throw updateError;

        setRounds(prev => prev.map(round => 
          round.id === roundId ? updatedRound : round
        ));
      }

      return { success: true };
    } catch (err) {
      console.error('?¼ìš´???ˆí‡´ ?¤íŒ¨:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '?¼ìš´???ˆí‡´???¤íŒ¨?ˆìŠµ?ˆë‹¤.' 
      };
    }
  };

  // ?¼ìš´??ì°¸ì—¬??ëª©ë¡ ì¡°íšŒ
  const getRoundParticipants = async (roundId: string) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .select('*')
        .eq('round_id', roundId)
        .order('joined_at', { ascending: true });

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (err) {
      console.error('ì°¸ì—¬??ëª©ë¡ ì¡°íšŒ ?¤íŒ¨:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'ì°¸ì—¬??ëª©ë¡??ë¶ˆëŸ¬?¤ëŠ”???¤íŒ¨?ˆìŠµ?ˆë‹¤.',
        data: []
      };
    }
  };

  // ì§€??³„ ?„í„°ë§?  const getRoundsByRegion = (region: string) => {
    return rounds.filter(round => round.region === region);
  };

  // ?íƒœë³??„í„°ë§?  const getRoundsByStatus = (status: 'recruiting' | 'full' | 'completed') => {
    return rounds.filter(round => round.status === status);
  };

  // ? ì§œë³??„í„°ë§?  const getRoundsByDate = (date: string) => {
    return rounds.filter(round => round.date === date);
  };

  // ?¬ìš©?ê? ì°¸ì—¬ ì¤‘ì¸ ?¼ìš´???•ì¸
  const isUserParticipating = async (roundId: string) => {
    if (!userId) return false;

    try {
      const { data, error } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .select('*')
        .eq('round_id', roundId)
        .eq('user_id', userId)
        .single();

      return !error && !!data;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return {
    rounds,
    loading,
    error,
    fetchRounds,
    createRound,
    updateRound,
    deleteRound,
    joinRound,
    leaveRound,
    getRoundParticipants,
    getRoundsByRegion,
    getRoundsByStatus,
    getRoundsByDate,
    isUserParticipating,
  };
};
