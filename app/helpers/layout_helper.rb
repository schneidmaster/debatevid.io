module LayoutHelper
  def set_meta_title(title) # rubocop:disable Style/AccessorMethodName
    set_meta_tags(
      title: title,
      og: {
        title: title,
      },
    )
  end

  def default_meta
    {
      title: 'DebateVid.io',
      viewport: 'width=device-width, initial-scale=1.0',
      description: 'DebateVid.io is a centralized source to find and search debate videos hosted on YouTube and Vimeo.',
      og: {
        title: 'DebateVid.io',
        description: 'DebateVid.io is a centralized source to find and search debate videos hosted on YouTube and Vimeo.',
        site_name: 'DebateVid.io',
        image: 'https://debatevid.io/opengraph.png',
      },
      'application-name': 'DebateVid.io',
      'msapplication-TileColor': '#FFFFFF',
      'msapplication-TileImage': '/mstile-144x144.png',
      'msapplication-square70x70logo': '/mstile-70x70.png',
      'msapplication-square150x150logo': '/mstile-150x150.png',
      'msapplication-wide310x150logo': '/mstile-310x150.png',
      'msapplication-square310x310logo': '/mstile-310x310.png',
      'theme-color': '#FFFFFF',
      icon: [
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '57x57',
          href: '/apple-touch-icon-57x57.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '114x114',
          href: '/apple-touch-icon-114x114.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '72x72',
          href: '/apple-touch-icon-72x72.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '144x144',
          href: '/apple-touch-icon-144x144.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '60x60',
          href: '/apple-touch-icon-60x60.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '120x120',
          href: '/apple-touch-icon-120x120.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '76x76',
          href: '/apple-touch-icon-76x76.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          sizes: '152x152',
          href: '/apple-touch-icon-152x152.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-196x196.png',
          sizes: '196x196',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png',
          sizes: '16x16',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-128.png',
          sizes: '128x128',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          type: nil,
          href: '/manifest.json',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#1285AF',
        },
      ],
    }
  end
end
