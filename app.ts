interface PayRequest {
    sum: number,
    from: number,
    to: number
}

enum ResponseStatus {
    SUCCESS = 'success',
    FAILED = 'failed'
}

interface PayResponseWithId extends PayRequest {
    databaseId: number
}

interface PayRespnseSuccess {
    status: ResponseStatus.SUCCESS,
    data: PayResponseWithId
}

interface PayResponseFailed {
    status: ResponseStatus.FAILED,
    data: {
        errorMessage: string,
        errorCode: number
    }
}

type PayResponse = PayRespnseSuccess | PayResponseFailed

function isResponseSuccess(response: PayResponse): response is PayRespnseSuccess {
    return response.status === ResponseStatus.SUCCESS
}

function isResponseFailed(response: PayResponse): response is PayResponseFailed {
    return response.status === ResponseStatus.FAILED
}

const checkResponse = (response: PayResponse): number => {
    if (isResponseSuccess(response)) {
        return response.data.databaseId
    } else {
        throw new Error(response.data.errorMessage)
    }
}