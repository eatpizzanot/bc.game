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
    let currentBet = config.baseBet.value
    let totalProfit = 0
    let lastResult = 'none'
    let gameCount = 0
    
    // Initial balance for profit/loss tracking
    const initialBalance = currency.amount
    
    function updateStats(profit) {
        totalProfit = currency.amount - initialBalance
        gameCount++
        
        log.info(`Game #${gameCount}`)
        log.info(`Bet Amount: ${currentBet} ${currency.currencyName}`)
        log.info(`Profit: ${profit} ${currency.currencyName}`)
        log.info(`Total Profit: ${totalProfit} ${currency.currencyName}`)
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
            
            const result = await game.bet(currentBet, config.target.value)
            const profit = result - currentBet
            
            if (profit > 0) {
                // Win - reset to base bet
                lastResult = 'win'
                currentBet = config.baseBet.value
                log.success('Win!')
            } else {
                // Loss - increase bet by 50%
                lastResult = 'loss'
                currentBet = Math.ceil(currentBet * 1.5)
                log.error('Loss!')
            }
            
            updateStats(profit)
            
        } catch (err) {
            log.error('Betting error: ' + err.message)
            game.stop()
        }
    }
}