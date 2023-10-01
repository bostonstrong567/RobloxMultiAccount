local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

_G.conn = nil

local function UpdateWebsiteValues(toggle, valuePath, valueName)
    if toggle then
        _G.conn = valuePath.Changed:Connect(function(value)
            local avatarUrl = Players:GetUserThumbnailAsync(LocalPlayer.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size352x352)
            local playerName = LocalPlayer.Name
            local status = "Online"

            local data = {
                userId = LocalPlayer.UserId,
                avatarUrl = avatarUrl,
                playerName = playerName,
                status = status,
                valueName = valueName,
                value = value
            }

            local response = request({
                Url = "http://localhost:3000/update-player",
                Method = "POST",
                Headers = {["Content-Type"] = "application/json"},
                Body = HttpService:JSONEncode(data)
            })
        end)
    else
        if _G.conn then
            _G.conn:Disconnect()
        end
    end
end

UpdateWebsiteValues(true, LocalPlayer.data.coins, "Coins")
