import { PokemonmoduleModule } from './pokemonmodule.module';

describe('PokemonmoduleModule', () => {
  let pokemonmoduleModule: PokemonmoduleModule;

  beforeEach(() => {
    pokemonmoduleModule = new PokemonmoduleModule();
  });

  it('should create an instance', () => {
    expect(pokemonmoduleModule).toBeTruthy();
  });
});
