# Creating a Module

This project organizes features as **modules** composed of clearly separated layers. Use the following steps to add a new module.

## 1. Scaffold the module
- Create `src/modules/<module-name>/`.
- Inside, add `domain`, `application`, `infrastructure`, and `interfaces` folders.
- Each folder should contain an `index.ts` re-exporting its public members.
- Add a root `index.ts` that re-exports the four subdirectories.

```
src/modules/<module-name>/
├── application/
├── domain/
├── infrastructure/
├── interfaces/
└── index.ts
```

Module folders use lowercase (typically plural) names while classes use `PascalCase`.

## 2. Define the domain
Place entities, value objects, and domain events under the `domain` folder and export them from `domain/index.ts`.

## 3. Implement application logic
Add use-cases and a service orchestrator under `application`. Decorate services with `@injectable` and inject any use-cases they require.

## 4. Specify interfaces
Define repository interfaces in the `interfaces` folder and export a DI token for each one:

```ts
export interface WidgetRepository { /* ... */ }
export const WIDGET_REPOSITORY = 'WidgetRepository';
```

## 5. Provide infrastructure
Implement repository classes under `infrastructure` (e.g., `InMemoryWidgetRepository`) and mark them `@injectable`.

## 6. Export the module
Update `src/modules/index.ts` to export the new module:

```ts
export * as widgets from './widgets';
```

## 7. Register with the DI container
Add your service and repository to `src/core/container.ts`:

```ts
child.registerSingleton<WidgetRepository>(
  WIDGET_REPOSITORY,
  InMemoryWidgetRepository
);
child.register(WidgetService, { useClass: WidgetService });
```

## 8. Add tests
Create unit tests (e.g., `tests/unit/widget.service.test.ts`) and any necessary integration tests to verify behavior.

## 9. Integrate with transports
Expose module functionality through interfaces like REST or Discord:
- Add Express routes under `src/interfaces/rest/routes`.
- Register Discord commands or events under `src/interfaces/discord`.

## 10. Run the test suite
Ensure everything passes:

```bash
npm test
```

Following these steps keeps modules consistent and discoverable across the codebase.
