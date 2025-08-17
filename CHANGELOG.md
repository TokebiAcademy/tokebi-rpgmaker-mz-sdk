# Changelog

All notable changes to the Tokebi Analytics RPG Maker MZ SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-16

### Added
- Initial release of Tokebi Analytics SDK for RPG Maker MZ
- Real-time event tracking with `Tokebi.track()` method
- Automatic session start/end tracking with deduplication
- Auto-detection of development vs production environment
- Plugin parameter configuration (API Key, Game Name, Tracking Enabled, Debug Mode)
- Modern ES6+ JavaScript with classes and async/await
- Automatic player ID generation and persistence via localStorage
- Game registration with Tokebi backend API using fetch()
- Payload flattening for complex nested objects with modern syntax
- Session end deduplication to prevent multiple events
- Debug mode with comprehensive console logging
- Error handling for network failures and API errors
- Support for all RPG Maker MZ deployment targets (Web, Desktop, Mobile)

### Features
- **Core Tracking**: Custom event tracking with flexible payload structure
- **Session Management**: Automatic session lifecycle tracking
- **Environment Detection**: Smart detection based on URL protocol and hostname
- **Player Identity**: Anonymous player ID generation and persistence
- **Game Registration**: Automatic game registration with fallback support
- **Network Resilience**: Robust error handling for offline/connection issues
- **Developer Experience**: Comprehensive debugging and testing tools
- **Modern JavaScript**: ES6+ classes, async/await, fetch API, template literals

### Technical Details
- Uses modern fetch() API for HTTP requests
- ES6+ syntax with classes and modern JavaScript features
- Plugin Manager integration for easy configuration
- Automatic timestamp handling by backend
- Clean event payload structure without redundant data
- Multiple session end event listeners with deduplication
- Platform identifier: 'rpgmaker-mz' for clear separation from MV version

### Improvements over MV Version
- **Modern JavaScript**: ES6+ classes instead of function constructors
- **Async/Await**: Cleaner asynchronous code without callback hell
- **Fetch API**: Modern HTTP requests instead of XMLHttpRequest
- **Arrow Functions**: Concise syntax for event handlers
- **Template Literals**: Cleaner string formatting
- **Better Error Handling**: Try/catch blocks with async operations
