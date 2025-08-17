# Tokebi Analytics RPG Maker MZ SDK

Real-time game analytics for RPG Maker MZ games. Track player behavior, game events, and custom metrics with minimal setup.

![RPG Maker MZ](https://img.shields.io/badge/RPG%20Maker-MZ-purple.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/Platform-Web%2FDesktop-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow.svg)

## 🚀 Features

- **Real-time Event Tracking** - Track player actions, level progression, and custom events
- **Session Analytics** - Automatic session start/end tracking with duration calculation
- **Custom Events** - Track any game-specific metrics that matter to your project
- **Auto-Detection** - Automatically detects development vs production environment
- **Modern JavaScript** - ES6+ features with async/await and fetch API
- **Privacy-focused** - Anonymous player IDs, no personal data collection

## 📋 Requirements

- **RPG Maker MZ** (tested and verified)
- Tokebi Analytics account: [https://tokebimetrics.com](https://tokebimetrics.com)
- Your game deployed to web or desktop

> **📝 Note**: For RPG Maker MV, use our separate [MV SDK](https://github.com/TokebiAcademy/tokebi-rpgmaker-mv-sdk)

## 🔧 Installation

### Step 1: Download the SDK

1. Download `TokebiSDK-MZ.js` from [Releases](https://github.com/TokebiAcademy/tokebi-rpgmaker-mz-sdk/releases)
2. Copy to your RPG Maker MZ project's `js/plugins/` folder

### Step 2: Configure Plugin

1. Open **RPG Maker MZ**
2. Go to **Tools** → **Plugin Manager**
3. **Enable** `TokebiSDK`
4. Set your **API Key** (get it from [tokebimetrics.com](https://tokebimetrics.com))
5. **Save** your project

### Step 3: Test Installation

1. **Playtest** your game (F5)
2. Press **F12** to open console
3. You should see: `[Tokebi] SDK initialization started`

## 🎮 Usage

### Basic Event Tracking

Track custom events anywhere in your game:

```javascript
// In RPG Maker Events (Script commands)
Tokebi.track('level_complete', {
    level: 'forest_dungeon',
    score: 1250,
    items_collected: 5
});

Tokebi.track('item_purchased', {
    item: 'magic_sword',
    cost: 500,
    currency: 'gold'
});

Tokebi.track('boss_defeated', {
    boss_name: 'Fire Dragon',
    player_level: 15,
    battle_duration: 180
});
```

### Combat Analytics

```javascript
// Track battle outcomes
Tokebi.track('battle_end', {
    outcome: 'victory',
    enemy_type: 'goblin',
    exp_gained: 25,
    damage_taken: 45
});

// Track skill usage
Tokebi.track('skill_used', {
    skill_name: 'Fireball',
    mp_cost: 12,
    damage_dealt: 85,
    target_count: 3
});
```

### Player Progression

```javascript
// Level ups
Tokebi.track('level_up', {
    new_level: 8,
    class: 'mage',
    stats_gained: {
        hp: 15,
        mp: 20,
        attack: 3
    }
});

// Quest completion
Tokebi.track('quest_complete', {
    quest_id: 'find_herbs',
    reward_gold: 100,
    reward_exp: 50,
    completion_time: 300
});
```

## 🔧 Configuration

### Plugin Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **API Key** | Your Tokebi Analytics API key | *(required)* |
| **Game Name** | Game title (auto-detected) | Project name |
| **Enable Tracking** | Turn analytics on/off | `true` |
| **Debug Mode** | Show console messages | `true` |

### Environment Detection

The SDK automatically detects your environment:

- **Development**: `file://`, `localhost`, `127.0.0.1`
- **Production**: Real domains like `itch.io`, `kongregate.com`

No manual configuration needed!

## 📊 Built-in Events

These events are tracked automatically:

| Event | When It Fires | Data Collected |
|-------|---------------|----------------|
| `session_start` | Game starts | Player ID, Game ID |
| `session_end` | Game closes/tab switches | Session duration (calculated) |

## 🧪 Testing & Debugging

### Console Output

With **Debug Mode** enabled, you'll see:

```
[Tokebi] Environment detected: development
[Tokebi] Player ID: player_1692123456_7834
[Tokebi] ✅ Game registered: game_abc123
[Tokebi] Tracking: level_complete
[Tokebi] ✅ Event sent successfully: level_complete
```

### Verify Events

1. Open **F12 Console** during playtest
2. Run: `Tokebi.test()` 
3. Should return: `"TokebiSDK MZ is working!"`

## 🌐 Platform Support

- **PC/Mac** (NW.js builds)
- **Web Browser** (HTML5 export)
- **Mobile** (via Cordova/web wrapper)
- **Steam/itch.io** (any web deployment)

## ⚡ What's Different from MV Version?

### Modern JavaScript Features
- **ES6+ Classes** instead of function constructors
- **Async/await** for cleaner asynchronous code
- **Fetch API** instead of XMLHttpRequest
- **Arrow functions** and template literals
- **Better error handling** with try/catch blocks

### Improved Developer Experience
- **Cleaner code structure** with modern syntax
- **Better debugging** with async stack traces
- **More robust** parameter handling

## 🚨 Troubleshooting

### "NO VALID API KEY SET" Error

- Check Plugin Manager → TokebiSDK → API Key field
- Get your key from [tokebimetrics.com](https://tokebimetrics.com)
- Don't use `test_key_123` (placeholder value)

### Console Shows No Messages

- Enable **Debug Mode** in Plugin Manager
- Check **F12 Console** tab (not Elements)
- Ensure plugin is **enabled** in Plugin Manager

### Events Not Sending

- Check internet connection
- Verify API key is correct
- Look for red error messages in console
- Ensure `trackingEnabled` is set to `true`

## 📁 Repository Structure

```
tokebi-rpgmaker-mz-sdk/
├── TokebiSDK-MZ.js        # Main SDK file (ES6+ compatible)
├── README.md              # This file
├── LICENSE                # MIT License
├── CHANGELOG.md           # Version history

```

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin my-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Dashboard**: [https://tokebimetrics.com](https://tokebimetrics.com)
- **Documentation**: [https://www.tokebimetrics.com/documentation-guide](https://www.tokebimetrics.com/documentation-guide)
- **Unity SDK**: [tokebi-unity-sdk](https://github.com/TokebiAcademy/tokebi-unity-sdk)
- **Godot SDK**: [tokebi-godot-plugin](https://github.com/TokebiAcademy/tokebi-godot-plugin)
- **RPG Maker MV SDK**: [tokebi-rpgmaker-mv-sdk](https://github.com/TokebiAcademy/tokebi-rpgmaker-mv-sdk)

## ⭐ Support

If this SDK helped your RPG Maker project, please give it a star! ⭐

Found a bug or have a feature request? [Open an issue](https://github.com/TokebiAcademy/tokebi-rpgmaker-mz-sdk/issues)
