{pkgs}: {
  deps = [
    pkgs.libxkbcommon
    pkgs.expat
    pkgs.alsa-lib
    pkgs.mesa
    pkgs.xorg.libxcb
    pkgs.xorg.libXrandr
    pkgs.xorg.libXfixes
    pkgs.xorg.libXext
    pkgs.xorg.libXdamage
    pkgs.xorg.libXcomposite
    pkgs.xorg.libX11
    pkgs.cairo
    pkgs.pango
    pkgs.gtk3
    pkgs.libdrm
    pkgs.dbus
    pkgs.cups
    pkgs.atk
    pkgs.nspr
    pkgs.nss
    pkgs.glib
  ];
}
