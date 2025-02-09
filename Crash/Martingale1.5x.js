var config = {
    baseBet: { 
        value: 100, 
        type: 'number', 
        label: 'Base Bet Amount' 
    },
    maxBet: {
        value: 1000000, 
        type: 'number', 
        label: 'Maximum Bet Amount'
    },
    target: {
        value: 1.5,
        type: 'number',
        label: 'Target Multiplier'
    },
    stopOnProfit: {
        value: 0,
        type: 'number',
        label: 'Stop on Profit (0 for no limit)'
    },
    stopOnLoss: {
        value: 0,
        type: 'number',
        label: 'Stop on Loss (0 for no limit)'
    }
}

function main() {
    // Initialize variables
    let currentBet = config.baseBet.value
    let totalProfit = 0
    let gameCount = 0
    let initialBalance = currency.amount
    let lastBet = 0
    
    function updateStats(profit, wasWin) {
        totalProfit = currency.amount - initialBalance
        gameCount++
        
        // Create detailed log message
        log.info('------------------------')
        log.info(`Game #${gameCount}`)
        log.info(`Last Bet: ${lastBet.toFixed(8)} ${currency.currencyName}`)
        log.info(`Game Profit: ${profit.toFixed(8)} ${currency.currencyName}`)
        log.info(`Total Profit: ${totalProfit.toFixed(8)} ${currency.currencyName}`)
        log.info(`Next Bet Will Be: ${currentBet.toFixed(8)} ${currency.currencyName}`)
        
        if (wasWin) {
            log.success('Result: WIN')
        } else {
            log.error('Result: LOSS')
        }
        log.info('------------------------')
    }
    
    function checkStopConditions() {
        if (config.stopOnProfit.value > 0 && totalProfit >= config.stopOnProfit.value) {
            log.success(`Target profit of ${config.stopOnProfit.value} reached!`)
            game.stop()
            return true
        }
        
        if (config.stopOnLoss.value > 0 && totalProfit <= -config.stopOnLoss.value) {
            log.error(`Stop loss of ${config.stopOnLoss.value} hit!`)
            game.stop()
            return true
        }
        
        if (currentBet > config.maxBet.value) {
            log.error('Maximum bet amount exceeded!')
            game.stop()
            return true
        }
        
        if (currentBet > currency.maxAmount) {
            log.error('Currency betting limit exceeded!')
            game.stop()
            return true
        }
        
        if (currentBet > currency.amount) {
            log.error('Insufficient balance for next bet!')
            game.stop()
            return true
        }
        
        return false
    }
    
    game.onBet = async function() {
        try {
            if (checkStopConditions()) return
            
            // Store the current bet amount before placing bet
            lastBet = currentBet
            
            // Place bet and await result
            const result = await game.bet(currentBet, config.target.value)
            const profit = result - currentBet
            
            if (profit > 0) {
                // WIN - Reset to base bet
                updateStats(profit, true)
                currentBet = config.baseBet.value
            } else {
                // LOSS - Increase bet by 50%
                updateStats(profit, false)
                currentBet = Math.ceil(currentBet * 1.5)
            }
            
        } catch (err) {
            log.error('Betting error: ' + err.message)
            game.stop()
        }
    }
    
    // Log initial setup
    log.info('------------------------')
    log.info('Script Started')
    log.info(`Base Bet: ${config.baseBet.value} ${currency.currencyName}`)
    log.info(`Target Multiplier: ${config.target.value}x`)
    log.info(`Starting Balance: ${initialBalance} ${currency.currencyName}`)
    log.info('------------------------')
}