# Code Review Skill

Use this skill when reviewing source code, pull requests, diffs, implementation plans, refactors, bug fixes, tests, or architecture changes.

## Goal

Perform a practical, production-minded code review that helps the developer improve correctness, maintainability, reliability, security, and test coverage without creating unnecessary noise.

The review should be direct, specific, and actionable.

## Review Mindset

Act like a senior engineer reviewing code before it reaches production.

Prioritize:
1. Correctness and bugs
2. Data loss, security, privacy, and production risk
3. Backward compatibility and API/database contract changes
4. Error handling and observability
5. Tests and edge cases
6. Maintainability, readability, and consistency
7. Performance only when there is a real risk or obvious inefficiency

Avoid nitpicks unless they materially improve the code.

## Inputs To Inspect

When available, review:

- The changed files or diff
- Related existing code near the change
- Tests added or modified
- Configuration files
- Database migrations
- API contracts
- Error handling paths
- Logging/monitoring behavior
- Build or deployment impact

If context is missing, make the best review possible and clearly state what could not be verified.

## Review Process

### 1. Understand the Intent

Before judging the code, identify:

- What problem the change is trying to solve
- What behavior changed
- What components are affected
- Whether the implementation matches the stated requirement

If the requirement and implementation disagree, call that out clearly.

### 2. Check Correctness

Look for:

- Logic errors
- Incorrect assumptions
- Null/None handling problems
- Bad conditionals
- Off-by-one errors
- Incorrect path/string parsing
- Wrong field mapping
- Serialization/deserialization issues
- Incorrect DTO/schema usage
- Broken control flow
- Incorrect return types
- Unexpected side effects
- Race conditions or concurrency problems

For each issue, explain:
- What is wrong
- Why it matters
- How to fix it

### 3. Check Edge Cases

Consider:

- Empty input
- Missing fields
- Duplicate records
- Invalid formats
- Large inputs
- Partial failures
- Retry behavior
- Timeouts
- Network failures
- Permission errors
- Nonexistent files/objects
- Already-processed records
- Backward compatibility with old data

### 4. Check Error Handling

Verify that the code:

- Fails safely
- Does not hide important errors
- Does not swallow exceptions silently
- Logs enough context for debugging
- Does not leak secrets or sensitive data in logs
- Uses meaningful exception types/messages
- Handles partial success when needed

### 5. Check Tests

Review whether tests cover:

- Happy path
- Failure path
- Edge cases
- Regression cases
- Integration points
- Mocking boundaries
- Expected database/API/file/S3 behavior

If tests are missing, recommend specific tests by name or scenario.

Avoid generic comments like “add more tests.” Say exactly what test is needed.

### 6. Check Security

Look for:

- Secret leakage
- Unsafe logging
- Injection risks
- Unsafe file/path handling
- Missing authorization checks
- Overly broad permissions
- Insecure defaults
- Trusting external input
- Unsafe deserialization
- Exposing internal implementation details

Only raise security concerns that are plausible from the code.

### 7. Check Maintainability

Look for:

- Duplicated logic
- Unclear names
- Large functions
- Hidden coupling
- Confusing abstractions
- Inconsistent style with the existing codebase
- New code that bypasses existing helpers/patterns
- Hardcoded values that should be constants/configuration

Prefer small, targeted suggestions.

### 8. Check Performance

Only raise performance comments when there is evidence of risk.

Look for:

- Unbounded loops over large data
- Repeated database/API calls inside loops
- Loading large files fully into memory
- Missing indexes for new queries
- Inefficient serialization/parsing
- Expensive work repeated unnecessarily

Do not over-optimize.

## Output Format

Use this format by default:

```markdown
## Summary

Briefly describe what the change does and whether it looks safe overall.

## Findings

### High Priority

- [File/Line or Function] Issue title
  - Problem:
  - Risk:
  - Suggested fix:

### Medium Priority

- [File/Line or Function] Issue title
  - Problem:
  - Risk:
  - Suggested fix:

### Low Priority

- [File/Line or Function] Issue title
  - Problem:
  - Suggested fix:

## Tests To Add Or Verify

- Specific test scenario 1
- Specific test scenario 2

## Positive Notes

- Mention good decisions, clean design choices, or improvements worth keeping.
```

If there are no findings, say so clearly:

```markdown
## Summary

I did not find blocking issues in this change.

## Tests To Add Or Verify

- List any useful test gaps, if applicable.

## Positive Notes

- Mention what looks solid.
```

## Severity Guide

### High Priority

Use for issues that can cause:

- Production failure
- Data corruption or data loss
- Security/privacy risk
- Broken API contract
- Broken deployment
- Incorrect business behavior
- Major regression

### Medium Priority

Use for issues that can cause:

- Important edge-case failures
- Difficult debugging
- Missing relevant tests
- Maintainability problems likely to hurt soon
- Error handling gaps

### Low Priority

Use for:

- Naming improvements
- Minor simplification
- Style consistency
- Small readability improvements
- Non-blocking cleanup

## Comment Style

Be direct and useful.

Prefer:

> This can fail when `s3_key` does not contain `/research/`. Add a validation branch before replacing the path and return a clear error.

Avoid:

> This seems bad.

Prefer:

> This test only covers the XML path. Add a PDF-path test that verifies `/research/` becomes `/researchPDF/` and `.xml` becomes `.pdf`.

Avoid:

> Add more tests.

## Code Suggestions

When suggesting code:

- Keep snippets short
- Show only the relevant change
- Match the existing project style
- Avoid rewriting the whole file unless requested
- Explain why the change is safer

Example:

```python
def derive_pdf_key(xml_key: str) -> str:
    if "/research/" not in xml_key:
        raise ValueError(f"Cannot derive PDF key from non-research path: {xml_key}")

    base, ext = os.path.splitext(xml_key)
    if ext.lower() != ".xml":
        raise ValueError(f"Expected XML key, got: {xml_key}")

    return base.replace("/research/", "/researchPDF/", 1) + ".pdf"
```

## Project-Specific Checks

When reviewing pipeline, Airflow, S3, database, or parser code, also check:

- DAG task dependencies are explicit and correct
- Task outputs match downstream expected input shape
- XML and PDF processing are independent unless merging is explicitly required
- S3 keys are derived safely and validated
- Encoded path segments are preserved
- Database uniqueness constraints match deduplication logic
- Parser return dictionaries/DTOs have consistent shape
- Batch processing handles partial failures
- Logs include enough identifiers: bucket, key, DAG run, batch id, article DOI, issue DOI
- Tests verify both XML and PDF paths when both formats are supported

## Things Not To Do

Do not:
- Invent requirements not present in the code or prompt
- Request massive rewrites without a strong reason
- Focus on formatting while ignoring correctness
- Suggest changing working code only because of personal preference
- Assume external systems behave perfectly
- Ignore tests
- Ignore error paths
- Hide uncertainty

## Final Checklist

Before finalizing the review, confirm:

- The main behavior is correct
- Edge cases were considered
- Error handling is reasonable
- Tests cover the risky parts
- No secrets or sensitive data are exposed
- The output is concise and actionable

