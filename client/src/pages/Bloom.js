import * as React from 'react'
import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'

const Bloom: React.SFC = props => {
  const requestData: RequestData = {
    action: "request_attestation_data",
    token: 'uniqueStringForThisRequest',
    url: 'https://localhost:3001/verifyBloom',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_name: 'Blockchain Artifact Database',
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['full-name', 'phone', 'email']
  }
  return (
    <div>
      <div className="App-Header">
        <p className="subtitle">Scan to register via Bloom ID</p>
      </div>
      <RequestQRCode requestData={requestData} size={200} />
    </div>
    );
}

export default Bloom;
