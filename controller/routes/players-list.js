class PlayersList {
    constructor() {
        this.selectedPlrs = [];
        this.finalTeam = [];
        this.callplrs = [];
    }

    addSelectedPlrs(player) {
        this.selectedPlrs.push(player);
    }

    getSelectedPlrs() {
        return this.selectedPlrs;
    }

}

module.exports = {
    playerList: new PlayersList()
}