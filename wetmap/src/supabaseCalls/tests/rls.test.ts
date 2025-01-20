import { supabase } from '../../supabase';
import { expect, describe, beforeAll, afterAll, test } from '@jest/globals';

describe('Playground RLS Tests', () => {
  let user1;
  beforeAll(async () => {
    const { data: user1Data } = await supabase.auth.signUp({
      email:    'user1@test.com',
      password: 'test',
    });
    user1 = user1Data.user;

    const { data: existingData } = await supabase
      .from('RLS_Test_Playground')
      .select('*')
      .eq('user_id', user1?.id);

    if (existingData?.length === 0) {
      const { data: insertData, error: insertError } = await supabase
        .from('RLS_Test_Playground')
        .insert([
          { user_id: user1?.id },
        ]);
      if (insertError) {
        throw new Error(`Error inserting data for user1: ${insertError.message}`);
      }
    }
  });

  afterAll(async () => {
    await supabase.auth.admin.deleteUser(user1.id);
  });

  test('User1 can access their own data', async () => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email:    'user1@test.com',
      password: 'test',
    });
    if (signInError) {
      throw new Error(`Error signing in user1: ${signInError.message}`);
    }
    const { data, error } = await supabase
      .from('RLS_Test_Playground')
      .select('*')
      .eq('user_id', user1.id);

    expect(error).toBeNull();
    expect(data?.length).toBe(1);
  });
});
