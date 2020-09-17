import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { EXTERNAL_LINKS } from 'constants/links';
import { CRYPTO_CURRENCY_MAP, SYNTHS_MAP } from 'constants/currency';

import { NoTextTransform, ExternalLink } from 'styles/common';

import { MessageContainer, Message, MessageButton } from '../common';
import { DesktopOnlyView } from 'components/Media';

const { sUSD } = SYNTHS_MAP;
const { ETH } = CRYPTO_CURRENCY_MAP;

const NoSynthsCard: FC = () => {
	const { t } = useTranslation();

	return (
		<MessageContainer>
			<DesktopOnlyView>
				<Message>
					<Trans
						t={t}
						i18nKey="exchange.no-synths-card.message"
						values={{ currencyKey: sUSD }}
						components={[<NoTextTransform />]}
					/>
				</Message>
			</DesktopOnlyView>
			<ExternalLink href={EXTERNAL_LINKS.Trading.OneInchLink(ETH, sUSD)}>
				<MessageButton>
					<Trans
						t={t}
						i18nKey="common.currency.get-currency"
						values={{ currencyKey: sUSD }}
						components={[<NoTextTransform />]}
					/>
				</MessageButton>
			</ExternalLink>
		</MessageContainer>
	);
};

export default NoSynthsCard;