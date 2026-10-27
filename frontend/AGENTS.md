<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## API integration and payload rules

- When an API call is broken or its behavior changes, trace the complete integration before editing: frontend caller, `src/services/api.ts`, TypeScript request/response types, backend controller route and method, and backend request/response models. Confirm the configured base URL, path, HTTP method, headers, query parameters, and response shape agree across both sides.
- Diagnose the failure using available evidence (for example, the actual serialized request, HTTP status and response body, browser network details, and backend logs). Distinguish connection/configuration failures from route, payload, validation, and response-contract failures. Do not assume a payload change is the cause or change the contract just to suppress an error.
- When a request payload changes, update the frontend type and every caller that constructs it, as well as the backend DTO/controller handling and relevant validation. Check required versus optional fields, names, types, enum values, and omitted versus `null` values; preserve backwards compatibility unless a breaking change is intended.
- Add or update focused tests for the changed request/response contract and the affected integration path where the project has test coverage. Verify both successful requests and relevant invalid or missing-field cases.
- Do not hide integration failures behind empty collections, fabricated response values, or `null` results. Preserve and surface actionable error information through the existing UI/error-handling conventions.

## Testing rules

- Before changing behavior, check the existing test files, test framework, and available test commands.
- Add or update tests for changed behavior. If a relevant test file is missing, create one using the project’s existing test framework and conventions.
- If the project has no test framework or runnable test command, don’t add a test file that can’t run or claim the change is tested. Report the gap and propose the smallest suitable setup.
- Run the focused tests for the change and report the command and result. If tests can’t be run, explain why.