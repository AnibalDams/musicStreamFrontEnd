<script>
  // Export props for customization
  let {min =0, max = 100, step = 1, value = $bindable(0), oninput=$bindable(null)} = $props();


  // Reactive statement to calculate progress percentage
  // The value will update automatically when 'value', 'min', or 'max' changes
  let progress = $derived((value - min) / (max - min)* 100) ;
</script>

<div class="range-container">
  <input
    type="range"
    {min}
    {max}
    {step}
    bind:value={value}
    oninput={oninput}
    style="--progress: {progress+0.8}%;"
    aria-label="Progress Slider"
  />
</div>

<style>
  .range-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 400px;
  }

  input[type="range"] {
    width: 100%;
    /* Use CSS variable to dynamically set background progress */
    background: linear-gradient(to right, var(--primary-color) var(--progress), hsl(220, 15%, 5%) var(--progress));
    /* Remove default styling for better cross-browser consistency */
    appearance: none;
    height: 12px; /* Track height */
    border-radius: 5px;
    outline: none;
    transition: background 0.2s ease-in-out;
  }

  /* Styling for the thumb (Webkit/Blink) */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2.8px solid var(--primary-color);
    background: var(--secondary-color);
    border-radius: 50%;
    cursor: pointer;
  }

  /* Styling for the thumb (Firefox) */
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }

  .value-display {
    min-width: 30px;
    text-align: right;
    font-weight: bold;
  }
</style>