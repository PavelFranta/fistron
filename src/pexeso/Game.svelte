<script lang="typescript">
  import Card from "./Card.svelte";
  import { GameEngine } from "./game";
  import { cardPack, revealsCounter } from "./stores.js";
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  let game = new GameEngine();

  let buttonsVisible = false;

  onMount(() => {
    buttonsVisible = true;
  });

  function revealCard(card) {
    game.cardRevealed(card.detail);
  }

  function restartGame() {
    game.restartGame();
  }

  function changeTableSize(size:number) {
    game.tableSize = size;
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
  {#if buttonsVisible}
    <div transition:fly="{{ x: 100, duration: 2000 }}" style="flex: 1">
      <h1 style="text-align: center;">Score</h1>
      <p style="text-align: center; font-size: 25px">Počet tahů: {$revealsCounter}</p>
      <p style="text-align: center; font-size: 25px">Čas:: {$revealsCounter}</p>
      <div style="margin-top: 30px;">
        <button style="display: block; margin: auto; padding: 10px; background: white; margin-bottom: 10px; font-size: 18px" on:click={() => changeTableSize(4)}>4x4</button>
        <button style="display: block; margin: auto; padding: 10px; background: white; margin-bottom: 10px; font-size: 18px" on:click={() => changeTableSize(6)}>6x6</button>
        <button style="display: block; margin: auto; padding: 10px; background: white; margin-bottom: 10px; font-size: 18px" on:click={() => changeTableSize(8)}>8x8</button>
        <button style="display: block; margin: auto; padding: 10px; background: white; margin-bottom: 10px; font-size: 18px" on:click={restartGame}>RESET</button>
      </div>
    </div>
  {/if}
</div>
