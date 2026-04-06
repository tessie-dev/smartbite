import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ThemeContext } from '@/ThemeContext';
import PressableButton from '@/components/PressableButton';
import { suggestMeal } from '@/services/agent/agentApi';
import { SuggestMealResponse } from '@/types';

export default function AgentTestScreen() {
  const { theme } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [question, setQuestion] = useState('What should I eat next?');
  const [result, setResult] = useState<SuggestMealResponse | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  async function handleAskAI() {
    setIsLoading(true);
    setError('');

    try {
      const response = await suggestMeal(question);
      setResult(response);
    } catch (err: any) {
      console.error('Failed to call suggestMeal:', err);
      setResult(null);
      setError(err?.message || 'Failed to get suggestions.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: currentTheme.background },
      ]}
    >
      <Text style={[styles.title, { color: currentTheme.text }]}>
        AI Meal Agent Test
      </Text>
      <Text style={[styles.subtitle, { color: currentTheme.text }]}>
        Use this page to test the first end-to-end agent request.
      </Text>

      <TextInput
        value={question}
        onChangeText={setQuestion}
        multiline
        placeholder="Ask something like: What should I eat next?"
        placeholderTextColor="#888"
        style={[
          styles.input,
          {
            color: currentTheme.text,
            backgroundColor: currentTheme.navigationBackgroundColor,
            borderColor: currentTheme.text,
          },
        ]}
      />

      <PressableButton
        pressedHandler={handleAskAI}
        componentStyle={styles.button}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Ask AI'}
        </Text>
      </PressableButton>

      {isLoading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator size="small" color={currentTheme.navigationTextColor} />
          <Text style={[styles.stateText, { color: currentTheme.text }]}>
            Waiting for response...
          </Text>
        </View>
      ) : null}

      {error ? (
        <View style={[styles.resultBox, styles.errorBox]}>
          <Text style={styles.errorTitle}>Request Failed</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {result ? (
        <View style={styles.resultBox}>
          <Text style={[styles.resultTitle, { color: currentTheme.text }]}>
            Summary
          </Text>
          <Text style={[styles.resultSummary, { color: currentTheme.text }]}>
            {result.summary}
          </Text>

          <Text style={[styles.resultTitle, { color: currentTheme.text }]}>
            Suggestions
          </Text>
          {result.suggestions.map((item, index) => (
            <View key={`${item.title}-${index}`} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardReason}>{item.reason}</Text>
              {item.estimatedCalories ? (
                <Text style={styles.cardCalories}>
                  {item.estimatedCalories} calories
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    minHeight: 110,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#2F6FED',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stateText: {
    fontSize: 14,
  },
  resultBox: {
    gap: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  resultSummary: {
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderWidth: 1,
    borderColor: '#D8DCE7',
    borderRadius: 12,
    padding: 14,
    gap: 6,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  cardReason: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  cardCalories: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2F6FED',
  },
  errorBox: {
    borderWidth: 1,
    borderColor: '#F3B2B2',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFF4F4',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#A12626',
  },
  errorText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7A1E1E',
  },
});
