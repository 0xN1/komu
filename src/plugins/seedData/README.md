# Seed Data Plugin

This plugin automatically seeds your Payload CMS database with initial data when the application starts.

## Features

- **Automatic Data Seeding**: Runs after Payload initialization
- **Duplicate Prevention**: Checks if data already exists before seeding
- **Resource Management**: Creates resources first, then sessions with proper relationships
- **Environment Control**: Can be enabled/disabled based on environment variables

## Usage

### Basic Configuration

```typescript
import { seedDataPlugin } from './plugins/seedData'

export default buildConfig({
  // ... other config
  plugins: [
    seedDataPlugin({ enabled: true }),
  ],
})
```

### Environment-Based Configuration

```typescript
plugins: [
  seedDataPlugin({ enabled: process.env.NODE_ENV === 'development' }),
],
```

## Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Whether the plugin should run data seeding |

## How It Works

1. **Initialization Check**: Runs after Payload CMS initializes
2. **Data Existence Check**: Verifies if sessions or resources already exist
3. **Resource Creation**: Creates all resources first to establish relationships
4. **Session Creation**: Creates sessions with proper resource relationships
5. **Logging**: Provides detailed console output for debugging

## Data Structure

The plugin expects data in the following format:

```typescript
interface Session {
  title: string
  description: string
  topics: string[]
  date: Date
  resources: Resource[]
}

interface Resource {
  id: string
  title: string
  description: string
  uri: string
  tags: string[]
  type: string
}
```

## Hooks Used

- `afterInit`: Triggers after Payload CMS has fully initialized

## Error Handling

- Graceful error handling with detailed logging
- Continues operation even if seeding fails
- Console output for debugging and monitoring

## Best Practices

1. **Development Only**: Enable in development environment only
2. **Data Validation**: Ensure your seed data is properly formatted
3. **Environment Variables**: Use environment variables to control plugin behavior
4. **Monitoring**: Check console logs for seeding status and errors
