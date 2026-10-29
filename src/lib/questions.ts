import { questions } from "@/data/questions";
import {
  LEVELS,
  TOPICS,
  type Level,
  type Question,
  type Topic,
} from "@/types/question";

export function getAllQuestions(): Question[] {
  return questions;
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find(q => q.id === id);
}

export function getQuestionsByLevel(level: Level): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: Topic): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getLevelCounts(): Record<Level, number> {
  return Object.fromEntries(
    LEVELS.map(level => [level, getQuestionsByLevel(level).length]),
  ) as Record<Level, number>;
}

export function getTopicCounts(): Record<Topic, number> {
  return Object.fromEntries(
    TOPICS.map(topic => [topic, getQuestionsByTopic(topic).length]),
  ) as Record<Topic, number>;
}
