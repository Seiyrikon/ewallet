package ewallet.backend.dto.mapper;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.dto.ChatHistoryDto;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.model.tbl_chat_history;
import ewallet.backend.service.ChatFeatureService;

@Service
public class ChatHistoryDtoMapper implements Function<tbl_chat_history, ChatHistoryDto> {
    @Autowired
    private ChatFeatureService chatFeatureService;

    @Override
public ChatHistoryDto apply(tbl_chat_history history) {
    ResponseEntity<Map<String, Object>> chatHistoryInfo = chatFeatureService.chats(history.getRecipient_id());

    List<ChatSessionDto> messageList = (List<ChatSessionDto>) chatHistoryInfo.getBody().get("message");

    ChatSessionDto lastChatSession = messageList.isEmpty() ? null : messageList.get(messageList.size() - 1);

    String lastMessage = (lastChatSession != null) ? lastChatSession.message() : null;
    Timestamp lastMessageCreatedAt = (lastChatSession != null) ? lastChatSession.created_at() : null;

    history.setLast_message(lastMessage);
    history.setCreated_at(lastMessageCreatedAt);

    return new ChatHistoryDto(
        history.getUser_id(),
        history.getRecipient_id(),
        history.getUsername(),
        history.getFirst_name(),
        history.getMiddle_name(),
        history.getLast_name(),
        history.getLast_message(),
        history.getCreated_at()
    );
}
}
