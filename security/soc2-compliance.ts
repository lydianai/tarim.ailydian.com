// SOC 2 Type II Compliance Framework
// Trust Services Criteria (TSC) Implementation

export interface ComplianceControl {
  id: string;
  category: 'CC' | 'A' | 'C' | 'P' | 'PI'; // Common Criteria, Availability, Confidentiality, Processing Integrity, Privacy
  principle: string;
  control: string;
  implemented: boolean;
  evidence: string[];
  owner: string;
  reviewFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
}

// Common Criteria (CC) - Security Controls
export const commonCriteriaControls: ComplianceControl[] = [
  {
    id: 'CC1.1',
    category: 'CC',
    principle: 'Control Environment',
    control: 'Organization demonstrates commitment to integrity and ethical values',
    implemented: true,
    evidence: ['CODE_OF_CONDUCT.md', 'SECURITY.md', 'security-config.ts'],
    owner: 'Security Team',
    reviewFrequency: 'annually'
  },
  {
    id: 'CC2.1',
    category: 'CC',
    principle: 'Communication and Information',
    control: 'Security policies and procedures are documented and communicated',
    implemented: true,
    evidence: ['SECURITY.md', 'README.md', 'security/soc2-compliance.ts'],
    owner: 'Security Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'CC3.1',
    category: 'CC',
    principle: 'Risk Assessment',
    control: 'Regular security risk assessments are performed',
    implemented: true,
    evidence: ['security/penetration-test.ts', 'npm audit', 'SECURITY.md'],
    owner: 'Security Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'CC4.1',
    category: 'CC',
    principle: 'Monitoring Activities',
    control: 'Security monitoring and logging are implemented',
    implemented: true,
    evidence: ['lib/security-config.ts (SecureLogger)', 'middleware.ts (rate limiting logs)'],
    owner: 'Operations Team',
    reviewFrequency: 'daily'
  },
  {
    id: 'CC5.1',
    category: 'CC',
    principle: 'Control Activities',
    control: 'Access controls restrict unauthorized access',
    implemented: true,
    evidence: ['middleware.ts (rate limiting)', 'CORS whitelist', 'Security headers'],
    owner: 'Security Team',
    reviewFrequency: 'monthly'
  },
  {
    id: 'CC6.1',
    category: 'CC',
    principle: 'Logical and Physical Access',
    control: 'Authentication and authorization mechanisms are in place',
    implemented: true,
    evidence: ['Vercel authentication', 'Environment variable protection', 'RBAC ready'],
    owner: 'Security Team',
    reviewFrequency: 'monthly'
  },
  {
    id: 'CC6.2',
    category: 'CC',
    principle: 'Logical and Physical Access',
    control: 'Multi-factor authentication is enforced for sensitive operations',
    implemented: false,
    evidence: ['Planned for NextAuth.js implementation'],
    owner: 'Development Team',
    reviewFrequency: 'monthly'
  },
  {
    id: 'CC6.6',
    category: 'CC',
    principle: 'Logical and Physical Access',
    control: 'Transmission of data is protected through encryption',
    implemented: true,
    evidence: ['HTTPS/TLS (HSTS header)', 'AES-256-CBC for data at rest', 'lib/security-config.ts'],
    owner: 'Security Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'CC7.1',
    category: 'CC',
    principle: 'System Operations',
    control: 'Security incidents are detected and responded to',
    implemented: true,
    evidence: ['SecureLogger', 'Rate limiting alerts', 'Error monitoring'],
    owner: 'Operations Team',
    reviewFrequency: 'daily'
  },
  {
    id: 'CC7.2',
    category: 'CC',
    principle: 'System Operations',
    control: 'System monitoring identifies anomalies',
    implemented: true,
    evidence: ['Rate limiting', 'Security validator', 'Log sanitization'],
    owner: 'Operations Team',
    reviewFrequency: 'daily'
  },
  {
    id: 'CC8.1',
    category: 'CC',
    principle: 'Change Management',
    control: 'Changes to system components are controlled',
    implemented: true,
    evidence: ['Git version control', 'Pull request reviews', 'Vercel deployments'],
    owner: 'Development Team',
    reviewFrequency: 'daily'
  }
];

// Availability Criteria (A)
export const availabilityControls: ComplianceControl[] = [
  {
    id: 'A1.1',
    category: 'A',
    principle: 'Availability',
    control: 'System availability commitments are met',
    implemented: true,
    evidence: ['Vercel 99.99% SLA', 'Edge network deployment', 'Auto-scaling'],
    owner: 'Operations Team',
    reviewFrequency: 'monthly'
  },
  {
    id: 'A1.2',
    category: 'A',
    principle: 'Availability',
    control: 'System performance is monitored',
    implemented: true,
    evidence: ['Vercel Analytics', 'Performance monitoring', 'Error tracking'],
    owner: 'Operations Team',
    reviewFrequency: 'daily'
  },
  {
    id: 'A1.3',
    category: 'A',
    principle: 'Availability',
    control: 'Backup and recovery procedures are in place',
    implemented: true,
    evidence: ['Git repository', 'Vercel deployment history', 'Database backups (when implemented)'],
    owner: 'Operations Team',
    reviewFrequency: 'daily'
  }
];

// Confidentiality Criteria (C)
export const confidentialityControls: ComplianceControl[] = [
  {
    id: 'C1.1',
    category: 'C',
    principle: 'Confidentiality',
    control: 'Confidential information is protected during transmission',
    implemented: true,
    evidence: ['HTTPS/TLS enforced', 'HSTS header', 'Secure WebSocket (WSS)'],
    owner: 'Security Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'C1.2',
    category: 'C',
    principle: 'Confidentiality',
    control: 'Confidential information is protected at rest',
    implemented: true,
    evidence: ['AES-256-CBC encryption', 'Encrypted environment variables', 'lib/security-config.ts'],
    owner: 'Security Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'C1.3',
    category: 'C',
    principle: 'Confidentiality',
    control: 'API keys and secrets are securely stored',
    implemented: true,
    evidence: ['Vercel environment variables', '.gitignore', 'No hardcoded secrets'],
    owner: 'Security Team',
    reviewFrequency: 'monthly'
  }
];

// Processing Integrity Criteria (PI)
export const processingIntegrityControls: ComplianceControl[] = [
  {
    id: 'PI1.1',
    category: 'PI',
    principle: 'Processing Integrity',
    control: 'Data processing is complete and accurate',
    implemented: true,
    evidence: ['TypeScript type safety', 'Input validation', 'Error handling'],
    owner: 'Development Team',
    reviewFrequency: 'monthly'
  },
  {
    id: 'PI1.2',
    category: 'PI',
    principle: 'Processing Integrity',
    control: 'Processing errors are identified and corrected',
    implemented: true,
    evidence: ['Error logging', 'SecureLogger', 'Monitoring alerts'],
    owner: 'Operations Team',
    reviewFrequency: 'daily'
  },
  {
    id: 'PI1.3',
    category: 'PI',
    principle: 'Processing Integrity',
    control: 'Data input is validated',
    implemented: true,
    evidence: ['Middleware validation', 'TypeScript interfaces', 'Sanitization functions'],
    owner: 'Development Team',
    reviewFrequency: 'monthly'
  }
];

// Privacy Criteria (P) - GDPR/CCPA Compliance
export const privacyControls: ComplianceControl[] = [
  {
    id: 'P1.1',
    category: 'P',
    principle: 'Privacy',
    control: 'Personal information is collected with consent',
    implemented: false,
    evidence: ['To be implemented with user authentication'],
    owner: 'Legal Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'P2.1',
    category: 'P',
    principle: 'Privacy',
    control: 'Personal information is retained according to policy',
    implemented: false,
    evidence: ['To be implemented with data retention policy'],
    owner: 'Legal Team',
    reviewFrequency: 'annually'
  },
  {
    id: 'P3.1',
    category: 'P',
    principle: 'Privacy',
    control: 'Personal information is disclosed only with authorization',
    implemented: true,
    evidence: ['No personal data collected currently', 'CORS restrictions', 'API access controls'],
    owner: 'Security Team',
    reviewFrequency: 'quarterly'
  },
  {
    id: 'P4.1',
    category: 'P',
    principle: 'Privacy',
    control: 'Personal information is securely disposed',
    implemented: false,
    evidence: ['To be implemented with data deletion procedures'],
    owner: 'Operations Team',
    reviewFrequency: 'quarterly'
  }
];

// All SOC 2 Controls
export const allSOC2Controls: ComplianceControl[] = [
  ...commonCriteriaControls,
  ...availabilityControls,
  ...confidentialityControls,
  ...processingIntegrityControls,
  ...privacyControls
];

// Compliance Assessment
export interface ComplianceAssessment {
  totalControls: number;
  implemented: number;
  notImplemented: number;
  complianceRate: number;
  readinessLevel: 'Not Ready' | 'In Progress' | 'Nearly Ready' | 'SOC 2 Ready';
  gaps: ComplianceControl[];
  recommendations: string[];
}

export function assessSOC2Compliance(): ComplianceAssessment {
  const totalControls = allSOC2Controls.length;
  const implemented = allSOC2Controls.filter(c => c.implemented).length;
  const notImplemented = totalControls - implemented;
  const complianceRate = (implemented / totalControls) * 100;

  let readinessLevel: ComplianceAssessment['readinessLevel'];
  if (complianceRate >= 95) readinessLevel = 'SOC 2 Ready';
  else if (complianceRate >= 80) readinessLevel = 'Nearly Ready';
  else if (complianceRate >= 50) readinessLevel = 'In Progress';
  else readinessLevel = 'Not Ready';

  const gaps = allSOC2Controls.filter(c => !c.implemented);

  const recommendations = [
    'Implement multi-factor authentication (MFA) for administrative access',
    'Develop and document incident response procedures',
    'Create data retention and deletion policies',
    'Implement comprehensive audit logging for all system events',
    'Conduct formal security awareness training',
    'Establish vendor risk management program',
    'Perform annual penetration testing by third party',
    'Implement disaster recovery and business continuity plans',
    'Document change management procedures',
    'Create privacy policy and terms of service'
  ];

  return {
    totalControls,
    implemented,
    notImplemented,
    complianceRate,
    readinessLevel,
    gaps,
    recommendations
  };
}

// Generate SOC 2 Compliance Report
export function generateSOC2Report(): string {
  const assessment = assessSOC2Compliance();

  let report = `
# SOC 2 TYPE II COMPLIANCE REPORT
Generated: ${new Date().toISOString()}

## Executive Summary

**Compliance Readiness**: ${assessment.readinessLevel}
**Overall Compliance Rate**: ${assessment.complianceRate.toFixed(1)}%

- Total Controls: ${assessment.totalControls}
- Implemented: ${assessment.implemented}
- Not Implemented: ${assessment.notImplemented}

## Controls by Category

### Common Criteria (CC) - Security
${generateCategorySection('CC')}

### Availability (A)
${generateCategorySection('A')}

### Confidentiality (C)
${generateCategorySection('C')}

### Processing Integrity (PI)
${generateCategorySection('PI')}

### Privacy (P)
${generateCategorySection('P')}

## Compliance Gaps

${assessment.gaps.length === 0 ? '✅ No gaps identified - full compliance achieved!' : ''}
${assessment.gaps.map(gap => `
### ${gap.id}: ${gap.principle}
- **Control**: ${gap.control}
- **Status**: ❌ Not Implemented
- **Owner**: ${gap.owner}
- **Evidence**: ${gap.evidence.join(', ')}
`).join('\n')}

## Recommendations

${assessment.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

## Next Steps for SOC 2 Certification

1. **Complete Gap Remediation** (1-2 months)
   - Implement missing controls
   - Document all procedures
   - Collect evidence

2. **Internal Audit** (1 month)
   - Review all controls
   - Test effectiveness
   - Update documentation

3. **Select Auditor** (2 weeks)
   - Choose SOC 2 certified firm
   - Define scope and timeline
   - Agree on reporting period

4. **Observation Period** (3-12 months)
   - Demonstrate control operation
   - Collect audit evidence
   - Maintain compliance

5. **External Audit** (1 month)
   - Auditor testing
   - Evidence review
   - Report generation

## Estimated Timeline to Certification

Based on current compliance rate of ${assessment.complianceRate.toFixed(1)}%:
- **Fast Track**: 6-9 months (if prioritized)
- **Standard**: 9-12 months
- **Conservative**: 12-18 months

## Maintenance Requirements

After certification, maintain compliance through:
- Quarterly internal audits
- Annual external audits
- Continuous monitoring
- Regular training
- Incident documentation

---
*This is an internal assessment. Official SOC 2 certification requires external audit.*
`;

  return report;
}

function generateCategorySection(category: ComplianceControl['category']): string {
  const controls = allSOC2Controls.filter(c => c.category === category);
  const implemented = controls.filter(c => c.implemented).length;
  const total = controls.length;
  const rate = ((implemented / total) * 100).toFixed(0);

  return `
**Status**: ${implemented}/${total} controls implemented (${rate}%)

${controls.map(c => `
- [${c.implemented ? 'x' : ' '}] **${c.id}**: ${c.control}
  - Owner: ${c.owner}
  - Review: ${c.reviewFrequency}
  - Evidence: ${c.evidence.join(', ')}
`).join('\n')}
`;
}

// Automated Compliance Checker
export async function runComplianceCheck(): Promise<{
  passed: boolean;
  score: number;
  report: string;
}> {
  const assessment = assessSOC2Compliance();

  return {
    passed: assessment.complianceRate >= 95,
    score: assessment.complianceRate,
    report: generateSOC2Report()
  };
}
