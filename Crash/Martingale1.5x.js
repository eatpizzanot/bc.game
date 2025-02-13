var config = {
    baseBet: { 
        label: "Base Bet", 
        value: 1000, 
        type: "number" 
    },
    payout: { 
        label: "Target Payout", 
        value: 1.5, 
        type: "number" 
    },
    stop: { 
        label: "Stop if next bet >", 
        value: 10000, 
        type: "number" 
    },
    onLoseTitle: { 
        label: "On Lose", 
        type: "title" 
    },
    onLoss: {
        label: "",
        value: "increase",
        type: "radio",
        options: [
            { value: "reset", label: "Return to base bet" },
            { value: "increase", label: "Increase bet by 50%" }
        ]
    },
    onWinTitle: { 
        label: "On Win", 
        type: "title" 
    },
    onWin: {
        label: "",
        value: "reset",
        type: "radio",
        options: [
            { value: "reset", label: "Return to base bet" },
            { value: "increase", label: "Increase bet" }
        ]
    }
};

function main() {
    var currentBet = config.baseBet.value;
    
    game.onBet = function() {
        game.bet(currentBet, config.payout.value).then(function(payout) {
            if (payout > 1) {
                // WIN
                if (config.onWin.value === "reset") {
                    currentBet = config.baseBet.value;
                }
                log.success("Won! Next bet will be " + currentBet + " " + currency.currencyName);
            } else {
                // LOSS
                if (config.onLoss.value === "reset") {
                    currentBet = config.baseBet.value;
                } else {
                    currentBet = Math.ceil(currentBet * 2.0);
                }
                log.error("Lost! Next bet will be " + currentBet + " " + currency.currencyName);
            }
            
            if (currentBet > config.stop.value) {
                log.error("Next bet would be " + currentBet + " which exceeds stop limit of " + config.stop.value);
                game.stop();
            }
        });
    };
}