{}:
let
  # Pin the deployment package-set to a specific version of nixpkgs
  pkgs = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/45c9736ed69800a6ff2164fb4538c9e40dad25d6.tar.gz";
      sha256 = "0q84mvh4liacqv8fdxpkm28233mfm5x1s36wwxhwdq01jivk58xn";
    })
    { };

in
with pkgs;
stdenv.mkDerivation {
  name = "blockfrost.dev";
  buildInputs = [
    nodejs-16_x
    (yarn.override { nodejs = nodejs-16_x; })
  ];
  shellHook = ''
    yarn
    # regenerate openapi - to fetch new openapi from gh, you have to reenter the shell or manually run yarn
    yarn regenerate-open-api
  '';
}
