{}:
let
  # Pin the deployment package-set to a specific version of nixpkgs
  pkgs = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/64fc73bd74f04d3e10cb4e70e1c65b92337e76db.tar.gz";
      sha256 = "056dxf6zmsyapf9kx5qasdh3f0kkydbl2s9lb62gh2c51klsihrb";
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
  '';
}
