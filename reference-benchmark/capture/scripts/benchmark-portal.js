// Benchmark-only host adapter: disable the SDK's localhost fake account/ad mode.
// The unchanged CrazyGamesPlugin already falls back to its real public guest flow.
// Never emit adFinished, identity/token, reward, progression or combat results.
window.CrazyGames = { SDK: { environment: 'disabled', init: function () { return Promise.resolve(); } } };
