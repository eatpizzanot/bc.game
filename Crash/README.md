# Martingale Betting Script

A customizable automated betting script implementing the Martingale strategy with a 1.5x target multiplier. This script includes comprehensive safety features and detailed statistics tracking to help manage your betting sessions.

## Features

- **Martingale Strategy Implementation**
  - Base bet reset on wins
  - 50% stake increase on losses
  - Target multiplier of 1.5x
  - Configurable base betting amount

- **Safety Measures**
  - Maximum bet limit
  - Stop-on-profit target
  - Stop-loss limit
  - Currency limit validation
  - Balance checks
  - Comprehensive error handling

- **Real-time Statistics**
  - Game counter
  - Current bet amount tracking
  - Per-game profit/loss
  - Total profit/loss
  - Detailed status messages

## Configuration Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| Base Bet | number | 100 | Starting bet amount and reset value after wins |
| Maximum Bet | number | 1000000 | Upper limit for bet amount to prevent excessive losses |
| Target Multiplier | number | 1.5 | Target payout multiplier |
| Stop on Profit | number | 0 | Stop script when profit reaches this amount (0 = no limit) |
| Stop on Loss | number | 0 | Stop script when loss reaches this amount (0 = no limit) |

## Automatic Stop Conditions

The script will automatically stop under the following conditions:

1. Profit target reached (if configured)
2. Stop loss hit (if configured)
3. Maximum bet limit exceeded
4. Currency betting limit exceeded
5. Insufficient balance for next bet
6. Any betting errors occur

## Usage

1. Load the script into your betting platform
2. Configure your desired parameters:
   ```javascript
   baseBet: Initial betting amount
   maxBet: Maximum allowed bet
   target: Target multiplier (default 1.5)
   stopOnProfit: Profit target (optional)
   stopOnLoss: Loss limit (optional)
   ```
3. Start the script
4. Monitor the console for detailed betting statistics and status updates

## Console Output

The script provides detailed console output for each game:

```
Game #1
Bet Amount: 100 USD
Profit: 50 USD
Total Profit: 50 USD
------------------------
```

## Warning

⚠️ **Risk Disclosure**: This script involves real money betting. While it includes safety measures, there's still a risk of losing money. Never bet more than you can afford to lose. Past performance does not guarantee future results.

## Error Handling

The script includes comprehensive error handling for:
- Invalid bet amounts
- Currency limit violations
- Balance insufficiency
- API/Connection errors

## Contributing

Feel free to fork this repository and submit pull requests for any improvements. Some areas for potential enhancement:
- Additional safety features
- More sophisticated betting strategies
- Enhanced statistics and reporting
- UI improvements

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This script is provided for educational purposes only. The authors are not responsible for any financial losses incurred while using this script. Always test thoroughly with small amounts before deploying with significant funds.