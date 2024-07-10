export type OperationResult = {
   isSuccess: boolean
}

export enum FileUploadStatus {
   Uploaded = 'Uploaded',
   Error = 'Error',
   NoFile = 'NoFile',
}

type FileUploadInitial = {
   status: FileUploadStatus.NoFile
}

type FileUploadSuccess = {
   status: FileUploadStatus.Uploaded
   name: string
}

type FileUploadFailed = {
   status: FileUploadStatus.Error
}

export type FileUploadState = FileUploadInitial | FileUploadSuccess | FileUploadFailed
