import { queryDNS } from 'cf-doh'
import { NextResponse, NextRequest } from 'next/server'

export async function GET() {
	const mx = await queryDNS('google.com', 'MX').catch(() => null)

	if (!mx) {
		return NextResponse.json({ error: 'Failed to query DNS' }, { status: 500 })
	}
	
	return NextResponse.json({ mx }, { status: 200 })
}

export async function POST(req: NextRequest) {
	const { domain } = await req.json()

	if (!domain || typeof domain !== 'string') {
		return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
	}

	const mx = await queryDNS(domain, 'MX').catch(() => null)

	if (!mx) {
		return NextResponse.json({ error: 'Failed to query DNS' }, { status: 500 })
	}

	return NextResponse.json({ mx }, { status: 200 })
	
	console.log(mx)
}