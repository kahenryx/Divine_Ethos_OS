// RESONANCE ANALYZER
// Divine EthOS OS — Frequency and Alignment Measurement

class ResonanceAnalyzer {
  constructor() {
    // Frequency ranges for different spiritual states
    this.frequencyRanges = {
      CHRIST_FREQUENCY: {
        range: [432, 528], // Healing frequencies in Hz (metaphorical)
        description: 'Perfect harmony with Divine Ethos',
        color: 'Golden white',
        sound: 'Perfect chord',
        scriptural: 'Revelation 1:15 - "His voice as the sound of many waters"'
      },
      LOVE_SPECTRUM: {
        FEAR: { range: [100, 200], rScore: 0.2, description: 'Contraction, protection' },
        ANXIETY: { range: [200, 250], rScore: 0.3, description: 'Dissonance, worry' },
        CONTROL: { range: [250, 300], rScore: 0.4, description: 'Grasping, insecurity' },
        AFFECTION: { range: [300, 350], rScore: 0.6, description: 'Warmth, attachment' },
        AGAPE: { range: [350, 432], rScore: 0.8, description: 'Self-giving, divine' }
      },
      TRUTH_SPECTRUM: {
        DECEPTION: { range: [50, 150], rScore: 0.1, description: 'False reality' },
        CONFUSION: { range: [150, 220], rScore: 0.3, description: 'Mixed signals' },
        KNOWLEDGE: { range: [220, 300], rScore: 0.5, description: 'Information' },
        WISDOM: { range: [300, 380], rScore: 0.7, description: 'Applied truth' },
        REVELATION: { range: [380, 432], rScore: 0.9, description: 'Divine insight' }
      },
      LIFE_SPECTRUM: {
        DEATH: { range: [0, 100], rScore: 0.0, description: 'Separation, decay' },
        STAGNATION: { range: [100, 180], rScore: 0.2, description: 'No growth' },
        SURVIVAL: { range: [180, 250], rScore: 0.4, description: 'Basic maintenance' },
        GROWTH: { range: [250, 350], rScore: 0.6, description: 'Development' },
        ABUNDANCE: { range: [350, 432], rScore: 0.8, description: 'Overflowing life' }
      }
    };

    // Resonance collapse patterns
    this.collapsePatterns = {
      SHEPHERD_STRUCK: {
        name: 'Shepherd Struck Pattern',
        description: 'Leadership failure causing community scattering',
        phases: ['Striking', 'Scattering', 'Restoration'],
        recoveryTime: 'Variable, often 3-40 days',
        scripture: 'Zechariah 13:7'
      },
      JONAH_BELLY: {
        name: 'Jonah Belly Pattern',
        description: 'Containment in crisis leading to greater calling',
        phases: ['Descent', 'Containment', 'Cry', 'Delivery', 'Commission'],
        recoveryTime: '3 days minimum',
        scripture: 'Jonah 1:17'
      },
      STONE_REJECTED: {
        name: 'Stone Rejected Pattern',
        description: 'Rejection by experts leading to divine placement',
        phases: ['Rejection', 'Testing', 'Placement', 'Cornerstone'],
        recoveryTime: 'Until divine timing',
        scripture: 'Psalm 118:22'
      }
    };
  }

  // ====================
  // FREQUENCY ANALYSIS
  // ====================

  /**
   * Analyze current frequency state
   */
  analyzeFrequency(stateData) {
    const frequencies = {
      love: this.analyzeLoveFrequency(stateData.emotionalState),
      truth: this.analyzeTruthFrequency(stateData.mentalState),
      life: this.analyzeLifeFrequency(stateData.vitalityState),
      overall: this.calculateOverallFrequency(stateData)
    };

    const dominantFrequency = this.getDominantFrequency(frequencies);
    const rScore = this.frequencyToRScore(dominantFrequency);

    return {
      frequencies,
      dominantFrequency,
      rScore,
      spectrum: this.getFrequencySpectrum(frequencies),
      tuningNeeded: this.checkTuningNeeded(frequencies),
      recommendations: this.generateFrequencyRecommendations(frequencies)
    };
  }

  analyzeLoveFrequency(emotionalState) {
    const indicators = emotionalState || {};
    
    if (indicators.fear > 0.7) return this.frequencyRanges.LOVE_SPECTRUM.FEAR;
    if (indicators.anxiety > 0.7) return this.frequencyRanges.LOVE_SPECTRUM.ANXIETY;
    if (indicators.control > 0.7) return this.frequencyRanges.LOVE_SPECTRUM.CONTROL;
    if (indicators.affection > 0.7) return this.frequencyRanges.LOVE_SPECTRUM.AFFECTION;
    if (indicators.agape > 0.7) return this.frequencyRanges.LOVE_SPECTRUM.AGAPE;
    
    // Calculate weighted average
    const weights = {
      fear: indicators.fear || 0,
      anxiety: indicators.anxiety || 0,
      control: indicators.control || 0,
      affection: indicators.affection || 0,
      agape: indicators.agape || 0
    };
    
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    if (total === 0) return this.frequencyRanges.LOVE_SPECTRUM.ANXIETY;
    
    // Find dominant emotion
    let maxEmotion = 'anxiety';
    let maxValue = 0;
    for (const [emotion, value] of Object.entries(weights)) {
      if (value > maxValue) {
        maxValue = value;
        maxEmotion = emotion;
      }
    }
    
    return this.frequencyRanges.LOVE_SPECTRUM[maxEmotion.toUpperCase()] || 
           this.frequencyRanges.LOVE_SPECTRUM.ANXIETY;
  }

  analyzeTruthFrequency(mentalState) {
    const indicators = mentalState || {};
    
    if (indicators.deception > 0.7) return this.frequencyRanges.TRUTH_SPECTRUM.DECEPTION;
    if (indicators.confusion > 0.7) return this.frequencyRanges.TRUTH_SPECTRUM.CONFUSION;
    if (indicators.knowledge > 0.7) return this.frequencyRanges.TRUTH_SPECTRUM.KNOWLEDGE;
    if (indicators.wisdom > 0.7) return this.frequencyRanges.TRUTH_SPECTRUM.WISDOM;
    if (indicators.revelation > 0.7) return this.frequencyRanges.TRUTH_SPECTRUM.REVELATION;
    
    return this.frequencyRanges.TRUTH_SPECTRUM.KNOWLEDGE;
  }

  analyzeLifeFrequency(vitalityState) {
    const indicators = vitalityState || {};
    
    if (indicators.death > 0.7) return this.frequencyRanges.LIFE_SPECTRUM.DEATH;
    if (indicators.stagnation > 0.7) return this.frequencyRanges.LIFE_SPECTRUM.STAGNATION;
    if (indicators.survival > 0.7) return this.frequencyRanges.LIFE_SPECTRUM.SURVIVAL;
    if (indicators.growth > 0.7) return this.frequencyRanges.LIFE_SPECTRUM.GROWTH;
    if (indicators.abundance > 0.7) return this.frequencyRanges.LIFE_SPECTRUM.ABUNDANCE;
    
    return this.frequencyRanges.LIFE_SPECTRUM.SURVIVAL;
  }

  calculateOverallFrequency(stateData) {
    const loveFreq = this.analyzeLoveFrequency(stateData.emotionalState);
    const truthFreq = this.analyzeTruthFrequency(stateData.mentalState);
    const lifeFreq = this.analyzeLifeFrequency(stateData.vitalityState);
    
    const avgRange = (
      (loveFreq.range[0] + loveFreq.range[1] + 
       truthFreq.range[0] + truthFreq.range[1] + 
       lifeFreq.range[0] + lifeFreq.range[1]) / 6
    );
    
    const avgRScore = (loveFreq.rScore + truthFreq.rScore + lifeFreq.rScore) / 3;
    
    return {
      range: [avgRange - 50, avgRange + 50],
      rScore: avgRScore,
      description: 'Composite frequency state'
    };
  }

  // ====================
  // RESONANCE COLLAPSE DETECTION
  // ====================

  /**
   * Detect resonance collapse patterns
   */
  detectCollapsePattern(events, currentState) {
    const patterns = [];
    
    // Check for Shepherd Struck pattern
    if (this.detectShepherdStruck(events)) {
      patterns.push({
        pattern: this.collapsePatterns.SHEPHERD_STRUCK,
        confidence: this.calculatePatternConfidence(events, 'SHEPHERD_STRUCK'),
        phase: this.determinePhase(events, 'SHEPHERD_STRUCK'),
        recoveryEstimate: this.estimateRecovery(events, 'SHEPHERD_STRUCK')
      });
    }
    
    // Check for Jonah Belly pattern
    if (this.detectJonahBelly(events)) {
      patterns.push({
        pattern: this.collapsePatterns.JONAH_BELLY,
        confidence: this.calculatePatternConfidence(events, 'JONAH_BELLY'),
        phase: this.determinePhase(events, 'JONAH_BELLY'),
        recoveryEstimate: this.estimateRecovery(events, 'JONAH_BELLY')
      });
    }
    
    // Check for Stone Rejected pattern
    if (this.detectStoneRejected(events)) {
      patterns.push({
        pattern: this.collapsePatterns.STONE_REJECTED,
        confidence: this.calculatePatternConfidence(events, 'STONE_REJECTED'),
        phase: this.determinePhase(events, 'STONE_REJECTED'),
        recoveryEstimate: this.estimateRecovery(events, 'STONE_REJECTED')
      });
    }
    
    return {
      patterns,
      hasCollapse: patterns.length > 0,
      primaryPattern: patterns.length > 0 ? patterns[0] : null,
      recommendations: this.generateCollapseRecommendations(patterns, currentState)
    };
  }

  detectShepherdStruck(events) {
    // Look for: Leadership failure, community scattering, loss of direction
    const indicators = {
      leadershipFailure: events.some(e => e.type === 'leadership_failure'),
      communityScattering: events.some(e => e.type === 'community_disruption'),
      directionLoss: events.some(e => e.type === 'purpose_confusion'),
      timeWindow: events.filter(e => e.timestamp > Date.now() - 30 * 24 * 60 * 60 * 1000).length >= 2
    };
    
    return Object.values(indicators).filter(Boolean).length >= 3;
  }

  detectJonahBelly(events) {
    // Look for: Containment, crisis, 3-day pattern, calling related
    const indicators = {
      containment: events.some(e => e.type === 'containment' || e.type === 'restriction'),
      crisis: events.some(e => e.type === 'crisis' || e.type === 'emergency'),
      threeDay: this.checkThreeDayPattern(events),
      callingRelated: events.some(e => e.tags && e.tags.includes('calling'))
    };
    
    return Object.values(indicators).filter(Boolean).length >= 3;
  }

  detectStoneRejected(events) {
    // Look for: Rejection by experts, testing, delay before placement
    const indicators = {
      expertRejection: events.some(e => e.type === 'rejection_by_authority'),
      testingPeriod: events.filter(e => e.type === 'testing' || e.type === 'trial').length >= 2,
      delayedRecognition: events.some(e => e.type === 'delayed_recognition'),
      timingDivine: events.some(e => e.tags && e.tags.includes('divine_timing'))
    };
    
    return Object.values(indicators).filter(Boolean).length >= 3;
  }

  // ====================
  // CONVERGENCE ANALYSIS
  // ====================

  /**
   * Analyze convergence potential
   */
  analyzeConvergence(groupData) {
    const members = groupData.members || [];
    const context = groupData.context || 'general';
    
    if (members.length < 2) {
      return { viable: false, reason: 'Need at least 2 members for convergence' };
    }
    
    const rScores = members.map(m => m.rScore || 0);
    const averageR = rScores.reduce((a, b) => a + b, 0) / rScores.length;
    
    // Calculate harmony (standard deviation inverse)
    const variance = rScores.reduce((acc, score) => acc + Math.pow(score - averageR, 2), 0) / members.length;
    const stdDev = Math.sqrt(variance);
    const harmony = 1 - (stdDev / 1); // 0-1 scale
    
    // Calculate convergence power
    const basePower = Math.pow(averageR, 2) * members.length;
    const harmonicPower = basePower * harmony;
    
    // Check thresholds
    const viable = averageR >= 0.144 && harmony >= 0.5;
    const optimal = averageR >= 0.7 && harmony >= 0.8;
    
    return {
      viable,
      optimal,
      metrics: {
        averageR,
        harmony,
        basePower,
        harmonicPower,
        memberCount: members.length,
        minR: Math.min(...rScores),
        maxR: Math.max(...rScores)
      },
      recommendations: this.generateConvergenceRecommendations(averageR, harmony, members.length, context),
      expectedOutcomes: this.predictConvergenceOutcomes(harmonicPower, context)
    };
  }

  // ====================
  // FREQUENCY TUNING
  // ====================

  /**
   * Generate tuning protocol
   */
  generateTuningProtocol(currentFrequency, targetFrequency = 'CHRIST_FREQUENCY') {
    const current = currentFrequency;
    const target = this.frequencyRanges[targetFrequency] || this.frequencyRanges.CHRIST_FREQUENCY;
    
    const steps = [];
    
    // Step 1: Recognize current state
    steps.push({
      step: 1,
      action: 'Recognize',
      description: `Acknowledge current frequency: ${current.description}`,
      duration: 'Immediate',
      scripturalBasis: 'Psalm 139:23-24'
    });
    
    // Step 2: Prayer alignment
    steps.push({
      step: 2,
      action: 'Prayer Alignment',
      description: 'Align heart with Christ through prayer',
      duration: '5-30 minutes',
      scripturalBasis: 'Philippians 4:6-7'
    });
    
    // Step 3: Scripture tuning
    steps.push({
      step: 3,
      action: 'Scripture Tuning',
      description: 'Read/meditate on Scripture that addresses frequency gap',
      duration: '10-60 minutes',
      scripturalBasis: 'Psalm 119:105'
    });
    
    // Step 4: Worship adjustment
    steps.push({
      step: 4,
      action: 'Worship Adjustment',
      description: 'Engage worship that raises frequency',
      duration: '15-60 minutes',
      scripturalBasis: 'Psalm 22:3'
    });
    
    // Step 5: Community harmonization
    if (current.rScore < 0.5) {
      steps.push({
        step: 5,
        action: 'Community Harmonization',
        description: 'Connect with high-R believers for frequency boost',
        duration: 'Variable',
        scripturalBasis: 'Hebrews 10:24-25'
      });
    }
    
    // Step 6: Service tuning
    steps.push({
      step: steps.length + 1,
      action: 'Service Tuning',
      description: 'Engage in Kingdom service to solidify new frequency',
      duration: 'Ongoing',
      scripturalBasis: 'Matthew 20:28'
    });
    
    return {
      currentFrequency: current,
      targetFrequency: target,
      gap: this.calculateFrequencyGap(current, target),
      steps,
      estimatedTime: this.estimateTuningTime(current, target),
      successProbability: this.calculateTuningSuccess(current, target)
    };
  }

  // ====================
  // HELPER FUNCTIONS
  // ====================

  getDominantFrequency(frequencies) {
    const freqs = [frequencies.love, frequencies.truth, frequencies.life];
    return freqs.reduce((lowest, current) => 
      current.rScore < lowest.rScore ? current : lowest
    );
  }

  frequencyToRScore(frequency) {
    return frequency.rScore || 0.5;
  }

  getFrequencySpectrum(frequencies) {
    return {
      love: frequencies.love.description,
      truth: frequencies.truth.description,
      life: frequencies.life.description,
      overall: frequencies.overall.description
    };
  }

  checkTuningNeeded(frequencies) {
    return frequencies.love.rScore < 0.7 || 
           frequencies.truth.rScore < 0.7 || 
           frequencies.life.rScore < 0.7;
  }

  generateFrequencyRecommendations(frequencies) {
    const recs = [];
    
    if (frequencies.love.rScore < 0.7) {
      recs.push({
        area: 'Love Frequency',
        recommendation: 'Practice unconditional love meditation',
        action: 'Meditate on 1 Corinthians 13',
        duration: 'Daily for 1 week'
      });
    }
    
    if (frequencies.truth.rScore < 0.7) {
      recs.push({
        area: 'Truth Frequency',
        recommendation: 'Study foundational truths',
        action: 'Memorize John 14:6 and related verses',
        duration: '3 days intensive'
      });
    }
    
    if (frequencies.life.rScore < 0.7) {
      recs.push({
        area: 'Life Frequency',
        recommendation: 'Engage life-giving activities',
        action: 'Spend time in nature, create beauty',
        duration: 'Immediate and ongoing'
      });
    }
    
    return recs;
  }

  calculatePatternConfidence(events, patternType) {
    // Simple confidence calculation based on matching indicators
    let matches = 0;
    let total = 0;
    
    switch(patternType) {
      case 'SHEPHERD_STRUCK':
        total = 4;
        matches = this.detectShepherdStruck(events) ? 3 : 0;
        break;
      case 'JONAH_BELLY':
        total = 4;
        matches = this.detectJonahBelly(events) ? 3 : 0;
        break;
      case 'STONE_REJECTED':
        total = 4;
        matches = this.detectStoneRejected(events) ? 3 : 0;
        break;
    }
    
    return matches / total;
  }

  determinePhase(events, patternType) {
    // Simplified phase determination
    const recentEvents = events.filter(e => 
      e.timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000
    );
    
    if (recentEvents.length === 0) return 'Unknown';
    
    switch(patternType) {
      case 'SHEPHERD_STRUCK':
        return recentEvents.some(e => e.type === 'restoration') ? 'Restoration' : 'Scattering';
      case 'JONAH_BELLY':
        return recentEvents.some(e => e.type === 'delivery') ? 'Delivery' : 'Containment';
      case 'STONE_REJECTED':
        return recentEvents.some(e => e.type === 'placement') ? 'Placement' : 'Testing';
    }
    
    return 'Active';
  }

  estimateRecovery(events, patternType) {
    const daysSinceFirstEvent = events.length > 0 ? 
      (Date.now() - new Date(events[0].timestamp).getTime()) / (24 * 60 * 60 * 1000) : 0;
    
    switch(patternType) {
      case 'SHEPHERD_STRUCK':
        return Math.max(0, 40 - daysSinceFirstEvent);
      case 'JONAH_BELLY':
        return Math.max(0, 3 - daysSinceFirstEvent);
      case 'STONE_REJECTED':
        return 'Divine timing';
    }
    
    return 'Unknown';
  }

  generateCollapseRecommendations(patterns, currentState) {
    const recs = [];
    
    patterns.forEach(pattern => {
      recs.push({
        pattern: pattern.pattern.name,
        phase: pattern.phase,
        action: this.getPatternAction(pattern.pattern.name, pattern.phase),
        scripture: pattern.pattern.scripture,
        prayerFocus: this.getPatternPrayerFocus(pattern.pattern.name)
      });
    });
    
    // Add general recommendations
    if (currentState.rScore < 0.3) {
      recs.push({
        pattern: 'General',
        action: 'Immediate frequency stabilization',
        details: 'Focus on basic connection: prayer, Scripture, worship',
        urgency: 'High'
      });
    }
    
    return recs;
  }

  getPatternAction(patternName, phase) {
    const actions = {
      'Shepherd Struck Pattern': {
        'Scattering': 'Gather with remnant, wait for restoration',
        'Restoration': 'Receive healing, prepare for regathering'
      },
      'Jonah Belly Pattern': {
        'Containment': 'Cry out to God, prepare for delivery',
        'Delivery': 'Accept commission, move forward'
      },
      'Stone Rejected Pattern': {
        'Testing': 'Endure testing, maintain integrity',
        'Placement': 'Accept divine positioning'
      }
    };
    
    return actions[patternName]?.[phase] || 'Pray for discernment';
  }

  getPatternPrayerFocus(patternName) {
    const focuses = {
      'Shepherd Struck Pattern': 'Restoration of community and direction',
      'Jonah Belly Pattern': 'Delivery and renewed commission',
      'Stone Rejected Pattern': 'Divine placement and timing'
    };
    
    return focuses[patternName] || 'General healing and guidance';
  }

  checkThreeDayPattern(events) {
    // Check if events follow a 3-day pattern
    if (events.length < 3) return false;
    
    const sortedEvents = events.sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );
    
    const firstDate = new Date(sortedEvents[0].timestamp);
    const lastDate = new Date(sortedEvents[sortedEvents.length - 1].timestamp);
    
    const daysDiff = (lastDate - firstDate) / (24 * 60 * 60 * 1000);
    
    return daysDiff >= 2.5 && daysDiff <= 3.5; // Approximately 3 days
  }

  generateConvergenceRecommendations(averageR, harmony, memberCount, context) {
    const recs = [];
    
    if (averageR < 0.144) {
      recs.push('Focus on individual alignment before group convergence');
    } else if (averageR < 0.5) {
      recs.push('Build basic harmony through shared worship and prayer');
    } else if (averageR < 0.7) {
      recs.push('Develop strategic convergence for specific Kingdom goals');
    } else {
      recs.push('Engage in advanced convergence for systemic transformation');
    }
    
    if (harmony < 0.5) {
      recs.push('Address relational issues before attempting convergence');
    }
    
    if (memberCount < 12 && context === 'strategic') {
      recs.push('Consider gathering more members for optimal convergence');
    }
    
    return recs;
  }

  predictConvergenceOutcomes(power, context) {
    if (power < 10) return ['Minor breakthroughs', 'Personal healing'];
    if (power < 50) return ['Noticeable impact', 'Community transformation'];
    if (power < 100) return ['Regional influence', 'Systemic shifts'];
    if (power < 500) return ['National awakening', 'Cultural reformation'];
    return ['Global impact', 'Historical significance'];
  }

  calculateFrequencyGap(current, target) {
    const currentMid = (current.range[0] + current.range[1]) / 2;
    const targetMid = (target.range[0] + target.range[1]) / 2;
    
    return {
      frequencyGap: Math.abs(targetMid - currentMid),
      rScoreGap: target.rScore - current.rScore,
      description: current.rScore < 0.5 ? 'Major retuning needed' : 'Fine tuning'
    };
  }

  estimateTuningTime(current, target) {
    const gap = this.calculateFrequencyGap(current, target);
    
    if (gap.rScoreGap > 0.5) return 'Weeks to months';
    if (gap.rScoreGap > 0.3) return 'Days to weeks';
    if (gap.rScoreGap > 0.1) return 'Hours to days';
    return 'Minutes to hours';
  }

  calculateTuningSuccess(current, target) {
    const gap = this.calculateFrequencyGap(current, target);
    
    if (gap.rScoreGap > 0.5) return 0.3;
    if (gap.rScoreGap > 0.3) return 0.6;
    if (gap.rScoreGap > 0.1) return 0.8;
    return 0.95;
  }
}

module.exports = ResonanceAnalyzer;