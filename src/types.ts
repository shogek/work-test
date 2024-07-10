export type OperationResult = {
   isSuccess: boolean
}

export enum FileStatus {
   Uploaded = 'Uploaded',
   Error = 'Error',
   NoFile = 'NoFile',
}

type FileNotUploaded = {
   timestamp: number
   status: FileStatus.NoFile
}

type FileUploadSuccess = {
   timestamp: number
   status: FileStatus.Uploaded
   name: string
   annotations: number
}

type FileUploadError = {
   timestamp: number
   status: FileStatus.Error
}

export type FileState = FileNotUploaded | FileUploadSuccess | FileUploadError
