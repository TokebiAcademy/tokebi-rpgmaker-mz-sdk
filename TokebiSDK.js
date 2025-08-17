//=============================================================================
// Tokebi Analytics SDK for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] TokebiSDK
 * @author Tokebi Academy
 * @version 1.0.0
 * @description Real-time game analytics for RPG Maker MZ
 * 
 * @param apiKey
 * @text API Key
 * @desc Your Tokebi Analytics API Key from tokebimetrics.com
 * @type string
 * @default
 * 
 * @param gameName
 * @text Game Name
 * @desc Your game's name (auto-detected if empty)
 * @type string
 * @default
 * 
 * @param trackingEnabled
 * @text Enable Tracking
 * @desc Enable/disable analytics tracking
 * @type boolean
 * @default true
 * 
 * @param debugMode
 * @text Debug Mode
 * @desc Show debug messages in console
 * @type boolean
 * @default true
 */

(() => {
    'use strict';
    
    // Get plugin parameters (MZ style)
    const pluginName = 'TokebiSDK';
    const parameters = PluginManager.parameters(pluginName);
    
    // Get values
    const API_KEY = parameters['apiKey'] || '';
    const GAME_NAME = parameters['gameName'] || ($dataSystem ? $dataSystem.gameTitle : 'RPG Maker Game');
    const TRACKING_ENABLED = parameters['trackingEnabled'] === 'true';
    const DEBUG_MODE = parameters['debugMode'] === 'true';
    const ENDPOINT = 'https://tokebi-api.vercel.app';
    
    // Auto-detect environment - NO developer input needed!
    const ENVIRONMENT = (window.location.protocol === 'file:' || 
                        window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1') ? 'development' : 'production';
    
    if (DEBUG_MODE) {
        console.log('[Tokebi] Environment detected: ' + ENVIRONMENT);
        console.log('[Tokebi] URL: ' + window.location.href);
    }
    
    // STOP if no API key
    if (!API_KEY || API_KEY === '' || API_KEY === 'test_key_123') {
        console.error("🚨 NO VALID API KEY SET!");
        console.error("🚨 Go to Plugin Manager → Tokebi Analytics SDK → Set your real API key!");
        alert("TOKEBI ERROR: No API key set! Check Plugin Manager parameters.");
        return;
    }
    
    // Modern class for MZ (ES6+ supported)
    class TokebiSDK {
        constructor() {
            this.apiKey = API_KEY;
            this.gameName = GAME_NAME;
            this.playerId = null;
            this.gameId = 'game_temp_' + Date.now();
            this.isInitialized = false;
            this.sessionEnded = false;
            
            if (!TRACKING_ENABLED) {
                this.log('Tracking disabled');
                return;
            }
            
            if (!this.apiKey) {
                this.log('ERROR: API Key is required. Set it in Plugin Parameters.');
                return;
            }
            
            this.init();
            this.setupSessionTracking();
        }
        
        log(message) {
            if (DEBUG_MODE) {
                console.log('[Tokebi] ' + message);
            }
        }
        
        async init() {
            try {
                // Load or generate player ID
                this.playerId = this.getOrCreatePlayerId();
                this.log('Player ID: ' + this.playerId);
                
                // Register game with API
                await this.registerGame();
                this.log('SDK initialization started - waiting for registration...');
                
            } catch (error) {
                this.log('Initialization error: ' + error.message);
            }
        }
        
        getOrCreatePlayerId() {
            const storageKey = 'tokebi_player_id';
            let playerId = null;
            
            // Try to load from localStorage
            if (typeof localStorage !== 'undefined') {
                playerId = localStorage.getItem(storageKey);
            }
            
            // Generate new ID if not found
            if (!playerId) {
                const timestamp = Math.floor(Date.now() / 1000);
                const random = Math.floor(Math.random() * 10000);
                playerId = 'player_' + timestamp + '_' + random;
                
                // Save to localStorage
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(storageKey, playerId);
                }
            }
            
            return playerId;
        }
        
        // Main tracking function
        track(eventType, payload = {}) {
            if (!TRACKING_ENABLED || !this.isInitialized) {
                this.log('Tracking disabled or not initialized');
                return;
            }
            
            try {
                // Flatten complex data
                const flatPayload = this.flattenPayload(payload);
                
                const eventBody = {
                    eventType: eventType,
                    payload: flatPayload,
                    gameId: this.gameId,
                    playerId: this.playerId,
                    platform: 'rpgmaker-mz',
                    environment: ENVIRONMENT
                };
                
                this.log('Tracking: ' + eventType);
                
                // Send the HTTP request
                this.sendToAPI(eventBody);
                
            } catch (error) {
                this.log('Tracking error: ' + error.message);
            }
        }
        
        // Flatten nested objects (ES6+ version)
        flattenPayload(obj, prefix = '') {
            const flattened = {};
            
            for (const [key, value] of Object.entries(obj)) {
                const newKey = prefix ? `${prefix}_${key}` : key;
                
                if (Array.isArray(value)) {
                    // Flatten arrays
                    value.forEach((item, index) => {
                        if (typeof item === 'object' && item !== null) {
                            Object.assign(flattened, this.flattenPayload(item, `${newKey}_${index + 1}`));
                        } else {
                            flattened[`${newKey}_${index + 1}`] = item;
                        }
                    });
                    flattened[`${newKey}_count`] = value.length;
                } else if (typeof value === 'object' && value !== null) {
                    // Flatten nested objects
                    Object.assign(flattened, this.flattenPayload(value, newKey));
                } else {
                    // Simple values
                    flattened[newKey] = value;
                }
            }
            
            return flattened;
        }
        
        // Send data to API (modern async/await)
        async sendToAPI(eventBody) {
            try {
                const response = await fetch(ENDPOINT + '/api/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.apiKey
                    },
                    body: JSON.stringify(eventBody)
                });
                
                if (response.ok) {
                    this.log('✅ Event sent successfully: ' + eventBody.eventType);
                } else {
                    this.log('❌ API Error: ' + response.status + ' - ' + response.statusText);
                }
                
            } catch (error) {
                this.log('❌ Network error: ' + error.message);
            }
        }
        
        // Register game with API (modern async/await)
        async registerGame() {
            try {
                const response = await fetch(ENDPOINT + '/api/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.apiKey
                    },
                    body: JSON.stringify({
                        gameName: this.gameName,
                        platform: 'rpgmaker-mz',
                        rpgmakerVersion: 'MZ',
                        playerCount: 1
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    this.gameId = data.game_id;
                    this.isInitialized = true;
                    this.log('✅ Game registered: ' + this.gameId);
                    
                    // Send session_start with correct game ID
                    this.track('session_start', {});
                    
                } else {
                    this.log('❌ Game registration failed: ' + response.status);
                    // Use fallback game ID and allow tracking
                    this.gameId = 'game_fallback_' + Date.now();
                    this.isInitialized = true;
                }
                
            } catch (error) {
                this.log('❌ Registration error: ' + error.message);
                this.gameId = 'game_fallback_' + Date.now();
                this.isInitialized = true;
            }
        }
        
        // Test method
        test() {
            return "TokebiSDK MZ is working!";
        }
        
        // Setup session tracking (start/end)
        setupSessionTracking() {
            // Track session end when page/game closes
            window.addEventListener('beforeunload', () => {
                this.trackSessionEnd();
            });
            
            // Track session end when page becomes hidden (mobile/tab switching)
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.trackSessionEnd();
                }
            });
            
            // Fallback for older browsers
            window.addEventListener('unload', () => {
                this.trackSessionEnd();
            });
        }
        
        // Track session end
        trackSessionEnd() {
            if (!this.isInitialized || this.sessionEnded) {
                return; // Already sent or not ready
            }
            
            this.sessionEnded = true; // Mark as sent to prevent duplicates
            this.track('session_end', {});
            this.log('Session ended');
        }
    }
    
    // Create instance and assign to global
    const tokebiInstance = new TokebiSDK();
    window.Tokebi = tokebiInstance;
    
})();
