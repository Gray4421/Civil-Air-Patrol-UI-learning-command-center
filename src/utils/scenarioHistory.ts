import { ScenarioHistoryEntry } from '../types';

export const SCENARIO_HISTORY_STORAGE_KEY = 'cap_cadet_scenario_history_log';

/**
 * Retrieves the full list of scenario execution history logs from localStorage.
 */
export const getScenarioHistory = (): ScenarioHistoryEntry[] => {
  try {
    const raw = localStorage.getItem(SCENARIO_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Failed to read scenario history from localStorage', err);
    return [];
  }
};

/**
 * Saves a new scenario history entry to localStorage (prepended as most recent).
 */
export const saveScenarioHistoryEntry = (entry: ScenarioHistoryEntry): ScenarioHistoryEntry[] => {
  try {
    const current = getScenarioHistory();
    // Prepend so newest is at the top
    const updated = [entry, ...current.filter((e) => e.id !== entry.id)];
    localStorage.setItem(SCENARIO_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save scenario history entry', err);
    return getScenarioHistory();
  }
};

/**
 * Deletes a single history log entry by ID.
 */
export const deleteScenarioHistoryEntry = (id: string): ScenarioHistoryEntry[] => {
  try {
    const current = getScenarioHistory();
    const updated = current.filter((e) => e.id !== id);
    localStorage.setItem(SCENARIO_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete scenario history entry', err);
    return getScenarioHistory();
  }
};

/**
 * Clears all scenario history logs from localStorage.
 */
export const clearScenarioHistory = (): void => {
  try {
    localStorage.removeItem(SCENARIO_HISTORY_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear scenario history', err);
  }
};

/**
 * Generates an official Civil Air Patrol formatted debrief transcript text.
 */
export const exportScenarioHistoryText = (entries: ScenarioHistoryEntry[]): string => {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let report = `========================================================================\n`;
  report += `     CIVIL AIR PATROL CADET ACADEMY - SCENARIO PERFORMANCE LOG\n`;
  report += `========================================================================\n`;
  report += `Generated on: ${dateStr}\n`;
  report += `Total Scenario Missions Logged: ${entries.length}\n`;
  report += `------------------------------------------------------------------------\n\n`;

  entries.forEach((entry, idx) => {
    report += `[MISSION #${idx + 1}] ${entry.scenarioTitle.toUpperCase()}\n`;
    report += `Category: ${entry.scenarioCategory} | Difficulty: ${entry.difficulty}\n`;
    report += `Completed: ${new Date(entry.completedAt).toLocaleString()}\n`;
    report += `Result: ${entry.passed ? 'PASSED' : 'UNSATISFACTORY'} ${entry.earnedHonorCredit ? '(HONOR CREDIT - 100% BEST CHOICES)' : ''}\n`;
    report += `Final Score: ${entry.score} / ${entry.maxScore} (${entry.percentage}%)\n`;
    report += `Best Decisions: ${entry.bestChoicesCount} / ${entry.totalStages} Stages\n`;
    report += `Cadet: ${entry.cadetName || 'Airman'} (${entry.cadetRank || 'Cadet'})\n\n`;
    report += `DECISION OUTCOMES:\n`;

    entry.decisions.forEach((dec) => {
      report += `  - Stage ${dec.stageIndex + 1}: ${dec.stageTitle}\n`;
      report += `    Question: ${dec.promptQuestion}\n`;
      report += `    Selected Course: "${dec.selectedOptionText}"\n`;
      report += `    Outcome Quality: ${dec.isBestCourse ? 'BEST COURSE OF ACTION' : dec.scoreModifier > 30 ? 'SUBOPTIMAL' : 'CRITICAL ERROR'} (+${dec.scoreModifier} Pts)\n`;
      report += `    Outcome Details: ${dec.outcomeText}\n`;
      report += `    CAP Doctrine: ${dec.referenceQuote}\n`;
      if (dec.coreValueDemonstrated) {
        report += `    Core Value: ${dec.coreValueDemonstrated}\n`;
      }
      report += `\n`;
    });

    report += `------------------------------------------------------------------------\n\n`;
  });

  return report;
};
