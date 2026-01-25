// PATTERN RECOGNIZER
// Divine EthOS OS — Biblical Pattern Detection System

class PatternRecognizer {
  constructor() {
    // Biblical Pattern Library
    this.patterns = {
      // Covenant Patterns
      COVENANT_ESTABLISHMENT: {
        name: 'Covenant Establishment',
        phases: ['Call', 'Promise', 'Sign', 'Testing', 'Fulfillment'],
        examples: ['Abrahamic Covenant', 'Davidic Covenant', 'New Covenant'],
        duration: 'Generational',
        keyVerse: 'Genesis 15:18',
        recognitionKeys: ['promise', 'sign', 'generational', 'faithfulness']
      },
      
      // Redemption Patterns
      EXODUS_PATTERN: {
        name: 'Exodus Pattern',
        phases: ['Bondage', 'Cry', 'Deliverer', 'Plagues', 'Exit', 'Wilderness', 'Promised Land'],
        examples: ['Egyptian Exodus', 'Babylonian Return', 'Personal Salvation'],
        duration: 'Variable',
        keyVerse: 'Exodus 3:7-8',
        recognitionKeys: ['oppression', 'deliverance', 'wilderness', 'promise']
      },
      
      // Resurrection Patterns
      THREE_DAY_PATTERN: {
        name: 'Three-Day Pattern',
        phases: ['Death', 'Containment', 'Resurrection', 'Commission'],
        examples: ['Jonah', 'Jesus', 'Lazarus', 'Personal Crisis'],
        duration: '3 days (literal or metaphorical)',
        keyVerse: 'Matthew 12:40',
        recognitionKeys: ['three days', 'darkness', 'new life', 'commission']
      },
      
      // Rejection Patterns
      REJECTED_STONE: {
        name: 'Rejected Stone',
        phases: ['Rejection', 'Testing', 'Divine Selection', 'Cornerstone'],
        examples: ['Joseph', 'David', 'Jesus', 'Paul'],
        duration: 'Until divine timing',
        keyVerse: 'Psalm 118:22',
        recognitionKeys: ['rejection by experts', 'testing', 'divine placement']
      },
      
      // Jubilee Patterns
      JUBILEE_CYCLE: {
        name: 'Jubilee Cycle',
        phases: ['Accumulation', 'Oppression', 'Cry', 'Trumpet', 'Release', 'Restoration'],
        duration: '49-50 year cycles',
        examples: ['Leviticus 25', 'Isaiah 61', 'Jesus\' Ministry'],
        keyVerse: 'Leviticus 25:10',
        recognitionKeys: ['debt', 'slavery', 'trumpet', 'release', 'return']
      },
      
      // Shepherd Patterns
      SHEPHERD_STRUCK: {
        name: 'Shepherd Struck',
        phases: ['Striking', 'Scattering', 'Restoration', 'Regathering'],
        duration: 'Variable, often 40 days',
        examples: ['Zechariah 13:7', 'Jesus\' Arrest', 'Church Persecutions'],
        keyVerse: 'Zechariah 13:7',
        recognitionKeys: ['leader attacked', 'followers scattered', 'divine restoration']
      },
      
      // Son of Man Patterns
      CLOUD_RIDER: {
        name: 'Cloud Rider',
        phases: ['Humiliation', 'Ascension', 'Session', 'Return'],
        duration: 'Eternal',
        examples: ['Daniel 7', 'Jesus\' Ascension', 'Second Coming'],
        keyVerse: 'Daniel 7:13-14',
        recognitionKeys: ['clouds', 'authority', 'judgment', 'kingdom']
      }
    };

    // Pattern Recognition Weights
    this.recognitionWeights = {
      phaseAlignment: 0.4,      // How well events match pattern phases
      durationFit: 0.2,         // How well timing matches pattern duration
      scripturalAlignment: 0.3, // How well matches scriptural examples
      fruitEvidence: 0.1        // Evidence of pattern fruit (growth, etc.)
    };
  }

  // ====================
  // PATTERN DETECTION
  // ====================

  /**
   * Detect patterns in current situation
   */
  detectPatterns(situation, history = []) {
    const detected = [];
    
    for (const [patternKey, pattern] of Object.entries(this.patterns)) {
      const confidence = this.calculatePatternConfidence(pattern, situation, history);
      
      if (confidence.totalScore >= 0.6) { // Threshold for detection
        detected.push({
          pattern: pattern.name,
          key: patternKey,
          confidence: confidence.totalScore,
          phase: this.determineCurrentPhase(pattern, situation, history),
          details: confidence,
          recommendations: this.generatePatternRecommendations(pattern, confidence.phase, situation)
        });
      }
    }
    
    // Sort by confidence
    detected.sort((a, b) => b.confidence - a.confidence);
    
    return {
      detectedPatterns: detected,
      primaryPattern: detected.length > 0 ? detected[0] : null,
      patternInteractions: this.analyzePatternInteractions(detected),
      nextLikelyPatterns: this.predictNextPatterns(detected, situation)
    };
  }

  /**
   * Calculate confidence for a specific pattern
   */
  calculatePatternConfidence(pattern, situation, history) {
    const scores = {
      phaseAlignment: this.scorePhaseAlignment(pattern, situation, history),
      durationFit: this.scoreDurationFit(pattern, history),
      scripturalAlignment: this.scoreScripturalAlignment(pattern, situation),
      fruitEvidence: this.scoreFruitEvidence(pattern, situation)
    };
    
    // Calculate weighted total
    let totalScore = 0;
    for (const [key, weight] of Object.entries(this.recognitionWeights)) {
      totalScore += scores[key] * weight;
    }
    
    return {
      totalScore: Math.min(1, totalScore), // Cap at 1
      scores,
      phaseConfidence: this.calculatePhaseConfidence(pattern, situation, history)
    };
  }

  /**
   * Score how well situation matches pattern phases
   */
  scorePhaseAlignment(pattern, situation, history) {
    const currentPhase = this.determineCurrentPhase(pattern, situation, history);
    if (!currentPhase) return 0;
    
    // Check if recent history shows progression through pattern phases
    const recentPhases = this.extractRecentPhases(pattern, history);
    const expectedProgression = pattern.phases.slice(0, pattern.phases.indexOf(currentPhase) + 1);
    
    let matchCount = 0;
    expectedProgression.forEach((phase, index) => {
      if (recentPhases[index] === phase) matchCount++;
    });
    
    return matchCount / expectedProgression.length;
  }

  /**
   * Score how well duration fits pattern
   */
  scoreDurationFit(pattern, history) {
    if (!history.length) return 0.5; // Neutral if no history
    
    const eventDates = history.map(h => new Date(h.timestamp)).sort((a, b) => a - b);
    const totalDuration = (eventDates[eventDates.length - 1] - eventDates[0]) / (24 * 60 * 60 * 1000); // Days
    
    // Check against pattern duration expectations
    if (pattern.duration.includes('day')) {
      const expectedDays = parseInt(pattern.duration) || 3;
      const deviation = Math.abs(totalDuration - expectedDays) / expectedDays;
      return Math.max(0, 1 - deviation);
    }
    
    if (pattern.duration.includes('year')) {
      const expectedYears = parseInt(pattern.duration) || 1;
      const totalYears = totalDuration / 365;
      const deviation = Math.abs(totalYears - expectedYears) / expectedYears;
      return Math.max(0, 1 - deviation);
    }
    
    return 0.5; // Neutral for variable/unknown durations
  }

  /**
   * Score scriptural alignment
   */
  scoreScripturalAlignment(pattern, situation) {
    let score = 0;
    const situationKeywords = this.extractKeywords(situation.description || '');
    
    // Check against pattern recognition keys
    pattern.recognitionKeys.forEach(keyword => {
      if (situationKeywords.includes(keyword.toLowerCase())) {
        score += 0.2;
      }
    });
    
    // Check situation tags against pattern examples
    if (situation.tags) {
      pattern.examples.forEach(example => {
        if (situation.tags.some(tag => example.toLowerCase().includes(tag.toLowerCase()))) {
          score += 0.1;
        });
      }
    }
    
    return Math.min(1, score);
  }

  /**
   * Score evidence of pattern fruit
   */
  scoreFruitEvidence(pattern, situation) {
    const fruits = {
      'Covenant Establishment': ['promise fulfillment', 'generational impact', 'faithfulness'],
      'Exodus Pattern': ['deliverance', 'freedom', 'new direction'],
      'Three-Day Pattern': ['new life', 'breakthrough', 'commission'],
      'Rejected Stone': ['divine placement', 'influence', 'validation'],
      'Jubilee Cycle': ['release', 'restoration', 'return'],
      'Shepherd Struck': ['restoration', 'regathering', 'strengthened faith'],
      'Cloud Rider': ['authority', 'perspective', 'kingdom focus']
    };
    
    const patternFruits = fruits[pattern.name] || [];
    const situationFruits = situation.fruits || [];
    
    let matchCount = 0;
    patternFruits.forEach(fruit => {
      if (situationFruits.some(sf => sf.toLowerCase().includes(fruit.toLowerCase()))) {
        matchCount++;
      }
    });
    
    return matchCount / patternFruits.length;
  }

  // ====================
  // PHASE DETERMINATION
  // ====================

  /**
   * Determine current phase in pattern
   */
  determineCurrentPhase(pattern, situation, history) {
    const recentEvents = history.slice(-5); // Last 5 events
    const currentKeywords = this.extractKeywords(situation.description || '');
    
    // Score each phase based on current situation and recent history
    const phaseScores = pattern.phases.map(phase => {
      let score = 0;
      
      // Check phase keywords in current situation
      const phaseKeywords = this.getPhaseKeywords(phase);
      phaseKeywords.forEach(keyword => {
        if (currentKeywords.includes(keyword)) {
          score += 0.3;
        }
      });
      
      // Check recent events for phase progression
      const expectedPreviousPhase = this.getExpectedPreviousPhase(pattern, phase);
      if (expectedPreviousPhase && recentEvents.some(e => 
        this.extractKeywords(e.description || '').includes(expectedPreviousPhase.toLowerCase())
      )) {
        score += 0.4;
      }
      
      // Check for phase-specific tags
      if (situation.tags && situation.tags.some(tag => 
        phase.toLowerCase().includes(tag.toLowerCase())
      )) {
        score += 0.3;
      }
      
      return { phase, score };
    });
    
    // Return phase with highest score
    phaseScores.sort((a, b) => b.score - a.score);
    return phaseScores[0].score > 0.5 ? phaseScores[0].phase : null;
  }

  /**
   * Calculate confidence for phase determination
   */
  calculatePhaseConfidence(pattern, situation, history) {
    const currentPhase = this.determineCurrentPhase(pattern, situation, history);
    if (!currentPhase) return { phase: null, confidence: 0 };
    
    const phaseIndex = pattern.phases.indexOf(currentPhase);
    const totalPhases = pattern.phases.length;
    
    // Confidence based on how clear the phase indicators are
    const phaseScore = this.scorePhaseAlignment(pattern, situation, history);
    
    return {
      phase: currentPhase,
      confidence: phaseScore,
      phaseNumber: phaseIndex + 1,
      totalPhases,
      progress: (phaseIndex + 1) / totalPhases
    };
  }

  // ====================
  // PATTERN INTERACTIONS
  // ====================

  /**
   * Analyze how detected patterns interact
   */
  analyzePatternInteractions(detectedPatterns) {
    if (detectedPatterns.length < 2) return { interactions: [] };
    
    const interactions = [];
    
    for (let i = 0; i < detectedPatterns.length; i++) {
      for (let j = i + 1; j < detectedPatterns.length; j++) {
        const patternA = detectedPatterns[i];
        const patternB = detectedPatterns[j];
        
        const interaction = this.analyzePatternPair(patternA, patternB);
        if (interaction.strength > 0.3) {
          interactions.push(interaction);
        }
      }
    }
    
    return {
      interactions,
      strongestInteraction: interactions.length > 0 ? 
        interactions.reduce((a, b) => a.strength > b.strength ? a : b) : null,
      interactionMatrix: this.createInteractionMatrix(detectedPatterns)
    };
  }

  analyzePatternPair(patternA, patternB) {
    // Check for complementary patterns
    const complementaryPairs = [
      ['Jubilee Cycle', 'Exodus Pattern'], // Both about freedom
      ['Rejected Stone', 'Cloud Rider'],   // Humiliation then exaltation
      ['Shepherd Struck', 'Three-Day Pattern'] // Death/resurrection themes
    ];
    
    let isComplementary = false;
    complementaryPairs.forEach(pair => {
      if ((pair[0] === patternA.pattern && pair[1] === patternB.pattern) ||
          (pair[1] === patternA.pattern && pair[0] === patternB.pattern)) {
        isComplementary = true;
      }
    });
    
    // Check for sequential patterns
    const sequentialStrength = this.checkSequential(patternA, patternB);
    
    // Check for reinforcing patterns
    const reinforcingStrength = this.checkReinforcing(patternA, patternB);
    
    return {
      patternA: patternA.pattern,
      patternB: patternB.pattern,
      isComplementary,
      sequentialStrength,
      reinforcingStrength,
      strength: Math.max(sequentialStrength, reinforcingStrength),
      type: sequentialStrength > reinforcingStrength ? 'Sequential' : 'Reinforcing',
      recommendations: this.generateInteractionRecommendations(patternA, patternB, 
        sequentialStrength > reinforcingStrength ? 'Sequential' : 'Reinforcing')
    };
  }

  // ====================
  // PATTERN PREDICTION
  // ====================

  /**
   * Predict likely next patterns based on current ones
   */
  predictNextPatterns(detectedPatterns, currentSituation) {
    if (detectedPatterns.length === 0) return [];
    
    const predictions = [];
    
    // Pattern completion predictions
    detectedPatterns.forEach(pattern => {
      const completionPattern = this.predictCompletionPattern(pattern);
      if (completionPattern) {
        predictions.push({
          triggerPattern: pattern.pattern,
          predictedPattern: completionPattern,
          reason: 'Pattern completion sequence',
          confidence: pattern.confidence * 0.8,
          timeframe: this.estimateTimeframe(pattern, completionPattern)
        });
      }
    });
    
    // Situation-based predictions
    const situationPredictions = this.predictFromSituation(currentSituation);
    predictions.push(...situationPredictions);
    
    // Sort by confidence
    predictions.sort((a, b) => b.confidence - a.confidence);
    
    return {
      predictions: predictions.slice(0, 3), // Top 3 predictions
      predictionConfidence: this.calculatePredictionConfidence(predictions),
      watchPoints: this.generateWatchPoints(predictions)
    };
  }

  // ====================
  // RECOMMENDATIONS
  // ====================

  /**
   * Generate recommendations for detected patterns
   */
  generatePatternRecommendations(pattern, phase, situation) {
    const recommendations = [];
    
    // Phase-specific recommendations
    const phaseRecs = this.getPhaseRecommendations(pattern.name, phase);
    recommendations.push(...phaseRecs);
    
    // Pattern-specific actions
    const patternRecs = this.getPatternActions(pattern.name, phase, situation);
    recommendations.push(...patternRecs);
    
    // Timing recommendations
    const timingRecs = this.getTimingRecommendations(pattern, phase);
    recommendations.push(...timingRecs);
    
    return {
      immediate: recommendations.filter(r => r.priority === 'high'),
      ongoing: recommendations.filter(r => r.priority === 'medium'),
      strategic: recommendations.filter(r => r.priority === 'low')
    };
  }

  // ====================
  // HELPER FUNCTIONS
  // ====================

  extractKeywords(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
  }

  extractRecentPhases(pattern, history) {
    const recentEvents = history.slice(-10); // Last 10 events
    const phases = [];
    
    recentEvents.forEach(event => {
      const keywords = this.extractKeywords(event.description || '');
      pattern.phases.forEach(phase => {
        const phaseKeywords = this.getPhaseKeywords(phase);
        if (phaseKeywords.some(keyword => keywords.includes(keyword))) {
          phases.push(phase);
        }
      });
    });
    
    return phases;
  }

  getPhaseKeywords(phase) {
    const keywordMap = {
      'Call': ['call', 'summon', 'invitation', 'election'],
      'Promise': ['promise', 'covenant', 'agreement', 'pledge'],
      'Testing': ['test', 'trial', 'wilderness', 'refining'],
      'Fulfillment': ['fulfill', 'complete', 'accomplish', 'realize'],
      'Bondage': ['bondage', 'slavery', 'oppression', 'captivity'],
      'Deliverer': ['deliverer', 'savior', 'redeemer', 'messiah'],
      'Exit': ['exit', 'exodus', 'departure', 'escape'],
      'Death': ['death', 'end', 'termination', 'loss'],
      'Containment': ['containment', 'tomb', 'grave', 'hidden'],
      'Resurrection': ['resurrection', 'new life', 'rebirth', 'revival'],
      'Rejection': ['rejection', 'refusal', 'denial', 'exclusion'],
      'Divine Selection': ['chosen', 'selected', 'appointed', 'anointed'],
      'Cornerstone': ['cornerstone', 'foundation', 'keystone', 'essential'],
      'Accumulation': ['accumulation', 'building', 'increase', 'growth'],
      'Release': ['release', 'freedom', 'liberty', 'jubilee'],
      'Restoration': ['restoration', 'return', 'renewal', 'rebuilding'],
      'Striking': ['strike', 'attack', 'wound', 'betrayal'],
      'Scattering': ['scatter', 'disperse', 'flee', 'abandon'],
      'Regathering': ['regather', 'reunite', 'restore', 'reconcile'],
      'Humiliation': ['humiliation', 'lowly', 'suffering', 'servant'],
      'Ascension': ['ascension', 'rise', 'elevate', 'exalt'],
      'Session': ['session', 'throne', 'authority', 'reign'],
      'Return': ['return', 'coming', 'appearing', 'manifestation']
    };
    
    return keywordMap[phase] || [phase.toLowerCase()];
  }

  getExpectedPreviousPhase(pattern, currentPhase) {
    const phaseIndex = pattern.phases.indexOf(currentPhase);
    return phaseIndex > 0 ? pattern.phases[phaseIndex - 1] : null;
  }

  createInteractionMatrix(detectedPatterns) {
    const matrix = {};
    const patternNames = detectedPatterns.map(p => p.pattern);
    
    patternNames.forEach(patternA => {
      matrix[patternA] = {};
      patternNames.forEach(patternB => {
        if (patternA === patternB) {
          matrix[patternA][patternB] = 1.0; // Self
        } else {
          // Simplified interaction score
          matrix[patternA][patternB] = Math.random() * 0.8; // Placeholder
        }
      });
    });
    
    return matrix;
  }

  checkSequential(patternA, patternB) {
    // Check if patterns typically follow one another
    const sequentialPairs = [
      ['Three-Day Pattern', 'Resurrection Patterns'], // Death then new life
      ['Rejected Stone', 'Cloud Rider'],              // Rejection then exaltation
      ['Shepherd Struck', 'Regathering Patterns']     // Scattering then gathering
    ];
    
    for (const pair of sequentialPairs) {
      if (patternA.pattern.includes(pair[0]) && patternB.pattern.includes(pair[1])) {
        return 0.8;
      }
      if (patternB.pattern.includes(pair[0]) && patternA.pattern.includes(pair[1])) {
        return 0.8;
      }
    }
    
    return 0;
  }

  checkReinforcing(patternA, patternB) {
    // Check if patterns reinforce each other
    const reinforcingThemes = {
      'Jubilee Cycle': ['freedom', 'restoration'],
      'Exodus Pattern': ['freedom', 'deliverance'],
      'Rejected Stone': ['humility', 'exaltation'],
      'Cloud Rider': ['authority', 'kingdom']
    };
    
    const themesA = reinforcingThemes[patternA.pattern] || [];
    const themesB = reinforcingThemes[patternB.pattern] || [];
    
    let commonThemes = 0;
    themesA.forEach(themeA => {
      if (themesB.includes(themeA)) commonThemes++;
    });
    
    return commonThemes / Math.max(themesA.length, themesB.length);
  }

  generateInteractionRecommendations(patternA, patternB, interactionType) {
    const recs = [];
    
    if (interactionType === 'Sequential') {
      recs.push({
        action: 'Prepare for next phase',
        details: `As ${patternA.pattern} completes, prepare for ${patternB.pattern}`,
        priority: 'high'
      });
    } else {
      recs.push({
        action: 'Leverage reinforcing themes',
        details: `Both patterns emphasize similar themes; focus on these areas`,
        priority: 'medium'
      });
    }
    
    return recs;
  }

  predictCompletionPattern(pattern) {
    const completionMap = {
      'Three-Day Pattern': 'Resurrection Commission',
      'Rejected Stone': 'Cornerstone Placement',
      'Shepherd Struck': 'Regathering and Strengthening',
      'Jubilee Cycle': 'Restoration and Return',
      'Exodus Pattern': 'Promised Land Possession'
    };
    
    return completionMap[pattern.pattern] || null;
  }

  predictFromSituation(situation) {
    const predictions = [];
    const keywords = this.extractKeywords(situation.description || '');
    
    if (keywords.includes('crisis') || keywords.includes('emergency')) {
      predictions.push({
        predictedPattern: 'Three-Day Pattern',
        reason: 'Crisis often leads to death/rebirth pattern',
        confidence: 0.7
      });
    }
    
    if (keywords.includes('rejection') || keywords.includes('exclusion')) {
      predictions.push({
        predictedPattern: 'Rejected Stone',
        reason: 'Rejection often precedes divine placement',
        confidence: 0.6
      });
    }
    
    if (keywords.includes('debt') || keywords.includes('slavery')) {
      predictions.push({
        predictedPattern: 'Jubilee Cycle',
        reason: 'Oppression often triggers jubilee release',
        confidence: 0.5
      });
    }
    
    return predictions;
  }

  estimateTimeframe(currentPattern, nextPattern) {
    const timeframeMap = {
      'Three-Day Pattern': '3-40 days',
      'Rejected Stone': 'Until divine timing',
      'Shepherd Struck': '40 days to several years',
      'Jubilee Cycle': '49-50 year cycles',
      'Exodus Pattern': 'Variable, often generation'
    };
    
    return timeframeMap[nextPattern] || 'Unknown';
  }

  calculatePredictionConfidence(predictions) {
    if (predictions.length === 0) return 0;
    
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
    const maxConfidence = Math.max(...predictions.map(p => p.confidence));
    
    return {
      average: avgConfidence,
      maximum: maxConfidence,
      reliability: avgConfidence > 0.6 ? 'High' : avgConfidence > 0.4 ? 'Medium' : 'Low'
    };
  }

  generateWatchPoints(predictions) {
    return predictions.map(p => ({
      pattern: p.predictedPattern,
      indicators: this.getPatternIndicators(p.predictedPattern),
      timeframe: p.timeframe,
      confidence: p.confidence
    }));
  }

  getPatternIndicators(patternName) {
    const indicatorMap = {
      'Three-Day Pattern': ['Dark night', 'Containment feeling', 'Cry for help'],
      'Rejected Stone': ['Expert rejection', 'Testing period', 'Divine confirmation'],
      'Jubilee Cycle': ['Debt accumulation', 'Trumpet call', 'Release opportunity'],
      'Exodus Pattern': ['Oppression increase', 'Deliverer appearance', 'Plague judgments']
    };
    
    return indicatorMap[patternName] || ['Watch for pattern-specific signs'];
  }

  getPhaseRecommendations(patternName, phase) {
    const recommendationMap = {
      'Three-Day Pattern': {
        'Death': [
          { action: 'Surrender completely', priority: 'high', scripture: 'John 12:24' },
          { action: 'Release control', priority: 'high', scripture: 'Matthew 26:39' }
        ],
        'Containment': [
          { action: 'Wait on God', priority: 'high', scripture: 'Psalm 130:5-6' },
          { action: 'Cry out honestly', priority: 'medium', scripture: 'Jonah 2:2' }
        ],
        'Resurrection': [
          { action: 'Receive new life', priority: 'high', scripture: 'Romans 6:4' },
          { action: 'Testify of breakthrough', priority: 'medium', scripture: 'Revelation 12:11' }
        ]
      },
      'Rejected Stone': {
        'Rejection': [
          { action: 'Maintain integrity', priority: 'high', scripture: '1 Peter 2:23' },
          { action: 'Trust divine timing', priority: 'medium', scripture: 'Ecclesiastes 3:11' }
        ],
        'Testing': [
          { action: 'Endure testing', priority: 'high', scripture: 'James 1:12' },
          { action: 'Grow in character', priority: 'medium', scripture: 'Romans 5:3-4' }
        ]
      }
    };
    
    return recommendationMap[patternName]?.[phase] || [
      { action: 'Pray for discernment', priority: 'medium', scripture: 'James 1:5' },
      { action: 'Study pattern in Scripture', priority: 'low', scripture: '2 Timothy 3:16-17' }
    ];
  }

  getPatternActions(patternName, phase, situation) {
    const actions = [];
    
    // Generic actions for all patterns
    actions.push({
      action: 'Record pattern observations',
      priority: 'medium',
      details: 'Document phase, timing, and key events'
    });
    
    actions.push({
      action: 'Share with spiritual community',
      priority: 'low',
      details: 'Get confirmation and wisdom from others'
    });
    
    // Pattern-specific actions
    if (patternName === 'Three-Day Pattern' && phase === 'Containment') {
      actions.push({
        action: 'Set 3-day watch',
        priority: 'high',
        details: 'Mark calendar for potential breakthrough timing'
      });
    }
    
    if (patternName === 'Jubilee Cycle' && situation.tags?.includes('financial')) {
      actions.push({
        action: 'Prepare for release',
        priority: 'high',
        details: 'Get finances in order for potential debt release'
      });
    }
    
    return actions;
  }

  getTimingRecommendations(pattern, phase) {
    const phaseIndex = pattern.phases.indexOf(phase);
    const totalPhases = pattern.phases.length;
    const progress = (phaseIndex + 1) / totalPhases;
    
    const recs = [];
    
    if (progress < 0.3) {
      recs.push({
        action: 'Prepare for journey',
        priority: 'medium',
        details: 'Early stage: gather resources, prepare mentally/spiritually'
      });
    } else if (progress < 0.7) {
      recs.push({
        action: 'Stay steady in process',
        priority: 'high',
        details: 'Middle stage: endurance needed, don\'t abort process'
      });
    } else {
      recs.push({
        action: 'Prepare for completion',
        priority: 'high',
        details: 'Late stage: get ready for transition to next phase'
      });
    }
    
    return recs;
  }
}

module.exports = PatternRecognizer;