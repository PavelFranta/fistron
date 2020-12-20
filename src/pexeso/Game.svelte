<script lang="typescript">
  import Card from "./Card.svelte";
  import { GameEngine } from "./game";
  import { cardPack, revealsCounter } from "./stores.js";

  let game = new GameEngine();

  function revealCard(card) {
    game.cardRevealed(card.detail);
  }

  function restartGame() {
    game.restartGame();
  }
</script>

<style>
  #board {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    max-width: 1000px;
  }

  main {
    margin-top: 15px;
    display:grid;
    grid-gap: 10px;
  }
</style>

<div id="board">
  <main style="grid-template-columns: repeat({game.tableSize}, 104px);">
    {#each $cardPack as card}
      <Card {card} on:revealed={revealCard} />
    {/each}
  </main>
  <div style="flex: 1">
    <h1 style="text-align: center;">Score</h1>
    <p style="text-align: center; font-size: 25px">Počet tahů: {$revealsCounter}</p>
    <button style="display: block; margin: auto" on:click={restartGame}>RESET</button>
  </div>
</div>
