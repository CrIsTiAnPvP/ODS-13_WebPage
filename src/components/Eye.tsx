"use client";
import {useLocale} from 'next-intl';

export default function Video() {

	const locale = useLocale()

	if (locale === 'es') {
		return (
			<div className="flex justify-center mb-0 mt-5">
				<video autoPlay muted width="50%">
					<source src="/videos/ods13es.mp4" type="video/mp4" />
					Lo sentimos, tu navegador no soporta videos.
				</video>
			</div>
		);
	} else {
		return (
			<div className="flex justify-center mb-0 mt-5">
				<video autoPlay muted width="50%">
					<source src="/videos/ods13en.mp4" type="video/mp4" />
					Sorry, your browser doesn&apos;t support videos.
				</video>
			</div>
		);
	}

  };
  