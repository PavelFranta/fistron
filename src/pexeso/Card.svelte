<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Card } from "./game";
  import { fly } from 'svelte/transition';
  export let card: Card;
  const dispatch = createEventDispatcher();

  $: symbol = card.revealed ? card.symbol : '';
  
  function revealCard() {
    dispatch('revealed', card);
  }
</script>

<style>
  section {
    transition: all 250ms;
    border: 2px solid black;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .victory-animation {
    transition: ease-out 500ms;
    transform: rotate(90deg);
  }
</style>

{#if card.visible}
   <section
     in:fly="{{ y: 200, duration: 2000 }}"
     class:victory-animation="{card.victoryCard}"
     on:click={revealCard}
     style="width: {card.size}px;
            height: {card.size}px;
            background: {card.revealed ? 'transparent' : card.backgroundColor};"
   >
     <span> {symbol} </span>
   </section>
{/if}
